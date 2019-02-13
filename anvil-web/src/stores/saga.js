import { combineReducers } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import * as app from './app';
import models from './models';

const modules = { app, ...models };

export const effects = Object.keys(modules).reduce((efs, mEffectsName) => {
  const mEffects = modules[mEffectsName].effects;
  efs = Object.keys(mEffects).reduce((efs, efKey) => {
    const e = mEffects[efKey];
    efs[`${mEffectsName}/${efKey}`] = e;
    return efs;
  }, efs);
  return efs;
}, {});

function handleActions(handlers, initialState, namespace) {
  const reducers = Object.keys(handlers).map((type) => {
    return (state, action) => {
      if (action.type === `${namespace}/${type}`) {
        return handlers[type](state, action);
      }
      return state;
    };
  });
  const reducer = (state, action) =>
    reducers.reduce((s, r) => {
      return r(s, action);
    }, state);
  return (state = initialState, action) => {
    if (action.type === `${namespace}/setState`) {
      return { ...state, ...action.payload };
    }
    return reducer(state, action);
  };
}

export function getReducers(history) {
  const mReducers = Object.keys(modules).reduce((rds, namespace) => {
    const m = modules[namespace];
    rds[namespace + 'State'] = handleActions(m.reducers || {}, m.state, namespace);
    return rds;
  }, {});
  return combineReducers({
    router: connectRouter(history),
    ...mReducers,
    appState: persistReducer(
      { key: 'app', keyPrefix: 'Anvil-', storage: session },
      mReducers.appState
    ),
  });
}

function* saga() {
  yield all(
    Object.keys(effects).map((key) =>
      takeEvery(key, function*(action) {
        try {
          const ret = yield effects[key](action);
          action._resolve && action._resolve(ret);
        } catch (err) {
          console.error('take', err);
          action._reject && action._reject(err);
        }
      })
    )
  );
}

export default saga;
