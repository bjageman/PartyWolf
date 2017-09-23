import io from 'socket.io-client'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { loginUser } from 'redux/users'
import { subscribe, getGamesEmit, createGameEmit,
    quitGameEmit, addPlayerEmit, assignRolesEmit, setVoteEmit } from './emitters'

import myConfig from 'config.js'
var url = myConfig.API_URL

export function connect() {
  const socket = io(url)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}


function* readSockets(socket) {
  try{
    const channel = yield call(subscribe, socket)
    while (true) {
      let action = yield take(channel)
      yield put(action)
    }
  }catch(err){
    console.log("readSockets ERROR: " + err.message)
  }

}

function* handleIO(socket) {
  try{
    yield fork(readSockets, socket)
    yield fork(loginUser, socket)
    yield fork(getGamesEmit, socket)
    yield fork(createGameEmit, socket)
    yield fork(quitGameEmit, socket)
    yield fork(addPlayerEmit, socket)
    yield fork(assignRolesEmit, socket)
    yield fork(setVoteEmit, socket)
  }catch(err){
    console.log("readSockets ERROR: " + err.message)
  }
}

export default function* flow() {
  while (true) {
    const socket = yield call(connect)
    const task = yield fork(handleIO, socket)
    yield take(actions.logout)
    yield cancel(task)
    socket.emit('logout')
  }
}
