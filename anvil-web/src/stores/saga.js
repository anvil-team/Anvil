import { combineReducers } from 'redux'
import { all, takeEvery } from 'redux-saga/effects'
import * as login from './module/login'

const modules = {
  login,
}

const effects = Object.keys(modules).reduce((efs, mEffectsName) => {
  const mEffects = modules[mEffectsName].effects
  efs = Object.keys(mEffects).reduce((efs, efKey) => {
    const e = mEffects[efKey]
    efs[`${mEffectsName}/${efKey}`] = e
    return efs
  }, efs)
  return efs
}, {})

const initialState = {}

function appReducer(state = initialState) {
  return { ...state }
}

function handleActions(handlers, initialState) {
  const reducers = Object.keys(handlers).map((type) => {
    return (state, action) => {
      if (action.type === type) {
        return handlers[type](state, action)
      }
      return state
    }
  })
  const reducer = (state, action) =>
    reducers.reduce((s, r) => {
      return r(s, action)
    }, state)
  return (state = initialState, action) => {
    if (action.type.includes('setState')) {
      return { ...state, ...action.payload }
    }
    return reducer(state, action)
  }
}

export function getReducers() {
  const mReducers = Object.keys(modules).reduce((rds, namespace) => {
    const m = modules[namespace]
    rds[namespace] = handleActions(m.reducers, m.state)
    return rds
  }, {})
  return combineReducers({
    app: appReducer,
    ...mReducers,
  })
}

function* saga() {
  yield all(Object.keys(effects).map((key) => takeEvery(key, effects[key])))
}

export default saga
