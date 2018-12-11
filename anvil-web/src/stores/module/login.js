import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'

const initialState = {
  login: true,
}

export const state = initialState

export const effects = {
  *say(action) {
    console.log('action', action)
    yield delay(1000)
    console.log('一秒后输出')
    yield put({ type: 'login/setState', payload: { login: false } })
  },
}

export const reducers = {}
