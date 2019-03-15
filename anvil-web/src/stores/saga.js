import { combineReducers } from 'redux';
import { all, takeEvery, select } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import * as Sentry from '@sentry/browser';
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
    // todo: encrypt by redux-persis-transform-encrypt
    appState: persistReducer(
      { key: 'app', keyPrefix: 'Anvil-', storage: session },
      mReducers.appState
    ),
  });
}

function* saga() {
  yield all(
    Object.keys(effects).map((key) => {
      return takeEvery(key, function*(action) {
        const effect = effects[key](action);
        try {
          const ret = yield effect;
          action._resolve && action._resolve(ret);
        } catch (err) {
          action._reject && action._reject(err);

          // 如果失去权限，这里就等待某个action，根据action 后继续操作
          const state = yield select();
          console.error('take', { ...err });
          Sentry.withScope((scope) => {
            scope.setExtra('action', action);
            scope.setExtra('state', state);
          });
          Sentry.captureException(err);
        }
      });
    })
  );
}

export default saga;
