import { fork } from 'redux-saga/effects'
import { registerUser } from './users'
import flow from './sockets/'

export default function* rootSaga() {
  yield fork(flow)
  yield fork(registerUser)
}
