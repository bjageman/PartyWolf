import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login, loginSuccess, logout, addUser, removeUser, createGame, createGameSuccess, addPlayerSuccess, makeVote
} from './actions';
import {Actions} from 'react-native-router-flux'

function connect() {
  const socket = io('http://10.0.2.2:5000');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

//Handle anything the server returns
function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('user_login_success', ({ user }) => {
      emit(loginSuccess({ user }));
      Actions['home']()
    });
    socket.on('create_game_response', ({ game }) => {
      emit(createGameSuccess({ game }));
      Actions['waitingRoom']()
    });
    socket.on('add_player_success', ({ game }) => {
      emit(addPlayerSuccess({ game }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${createGame}`);
    socket.emit('create_game', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let { payload } = yield take(`${login}`);
    const socket = yield call(connect);
    socket.emit('login', { username: payload.username, password: payload.password });
    const task = yield fork(handleIO, socket);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
    Actions['home']()
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
