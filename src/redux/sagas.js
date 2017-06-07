import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer,
  getUser,
  getGames, getGamesSuccess,
  createGame,
  assignRoles,
  setVote, voteFinished, gameFinished,
  quitGame, quitGameSuccess,
  gameUpdated, gameDeleted,
  getError
} from './actions';
import { postDataApi, fetchDataApi, verifyData } from './api'
import { myConfig } from '../../config.js';

url = myConfig.API_URL

function connect() {
  const socket = io(url);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

//Handle anything the server returns
function subscribe(socket) {
  try{
    return eventChannel(emit => {
      socket.on('user_login_success', ({ user }) => {
        emit(loginSuccess({ user }));
      });
      socket.on('get_games_success', ({ games }) => {
        emit(getGamesSuccess({ games }));
      });
      socket.on('game_updated', ({ game, votes, winner }) => {
        emit(gameUpdated({ game, votes, winner }));
      });
      socket.on('game_deleted', ({ game_id }) => {
        emit(gameDeleted({ game_id }));
      });
      socket.on('send_error', ({ error }) => {
        emit(getError({ error }));
      });
      socket.on('disconnect', e => {
        // TODO: handle
      });
      return () => {};
    });
  }catch(err){
    console.log("reading ERROR: " + err.message)
  }
}

function* readSockets(socket) {
  try{
    const channel = yield call(subscribe, socket);
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  }catch(err){
    console.log("readSockets ERROR: " + err.message)
  }

}

function* getGamesEmit(socket) {
  while (true) {
    const { payload } = yield take(`${getGames}`);
    socket.emit('get_games', payload);
  }
}

function* createGameEmit(socket) {
  while (true) {
    const { payload } = yield take(`${createGame}`);
    socket.emit('create_game', payload);
  }
}

function* quitGameEmit(socket) {
  while (true) {
    const { payload } = yield take(`${quitGame}`);
    socket.emit('quit_player', payload);
  }
}

function* addPlayerEmit(socket) {
  while (true) {
    const { payload } = yield take(`${addPlayer}`);
    socket.emit('add_player', payload);
  }
}

function* assignRolesEmit(socket) {
  while (true) {
    const { payload } = yield take(`${assignRoles}`);
    socket.emit('assign_roles', payload);
  }
}

function* setVoteEmit(socket) {
  while (true) {
    const { payload } = yield take(`${setVote}`);
    socket.emit('set_vote', payload);
  }
}

function* handleIO(socket) {
  try{
    yield fork(readSockets, socket);
    yield fork(loginUser, socket);
    yield fork(getGamesEmit, socket);
    yield fork(createGameEmit, socket);
    yield fork(quitGameEmit, socket);
    yield fork(addPlayerEmit, socket);
    yield fork(assignRolesEmit, socket);
    yield fork(setVoteEmit, socket);
  }catch(err){
    console.log("readSockets ERROR: " + err.message)
  }
}

function* flow() {
  while (true) {
    //let { payload } = yield take(`${login}`);
    const socket = yield call(connect);
    //socket.emit('login', { username: payload.username, password: payload.password });
    const task = yield fork(handleIO, socket);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
  }
}

function* loginUser(socket) {
  while (true) {
    const { payload } = yield take(`${login}`);
    console.log("PAYLOAD:",payload)
    socket.emit('login', { username: payload.username, password: payload.password });
  }
}

function* registerUser() {
    while (true) {
        try{
          let { payload } = yield take(`${register}`);
          let data = {"username": payload.username, "password": payload.password }
          const response = yield call(postDataApi, 'users', data);
          if (verifyData(response)) {
              console.log(response.data.username + " successfully registered!")
              yield put(registerSuccess(response.data))
            }else{
              error = response.data.error
              console.log(error)
              yield put(getError({ error }))
            }
          }catch(error){
            console.log(error.message)
            yield put(getError({ "error": error.message }))
          }
    }
}

export default function* rootSaga() {
  yield fork(flow);
  yield fork(registerUser)
}
