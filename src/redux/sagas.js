import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer,
  getUser,
  getGames,
  createGame,
  assignRoles, 
  setVote, voteFinished, gameFinished,
  quitGame, quitGameSuccess,
  gameUpdated
} from './actions';
import { postDataApi, fetchDataApi, verifyData } from './api'

url = "http://10.0.2.2:5000"

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
  return eventChannel(emit => {
    socket.on('user_login_success', ({ user }) => {
      emit(loginSuccess({ user }));
    });
    socket.on('get_user_success', ({ user }) => {
      emit(getUserSuccess({ user }));
    });
    socket.on('vote_final', ({ results, game }) => {
      emit(voteFinished({ results, game }));
    });
    socket.on('game_final', ({ result }) => {
      emit(gameFinished({ result }));
    });
    socket.on('game_updated', ({ game }) => {
      emit(gameUpdated({ game }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* readSockets(socket) {
  try{
    const channel = yield call(subscribe, socket);
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  }catch(err){
    console.log("readSockets ERROR: " + err)
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
  yield fork(readSockets, socket);
  yield fork(getGamesEmit, socket);
  yield fork(createGameEmit, socket);
  yield fork(quitGameEmit, socket);
  yield fork(addPlayerEmit, socket);
  yield fork(assignRolesEmit, socket);
  yield fork(setVoteEmit, socket);
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
    //Actions['home']()
  }
}

function* registerUser() {
    while (true) {
        try{
          let { payload } = yield take(`${register}`);
          let data = {"username": payload.username, "password": payload.password }
          console.log(data)
          const response = yield call(postDataApi, 'users', data);
          if (verifyData(response)) {
              redirect = "home"
              registerSuccess(response.data)
              //Actions['home']()
            }
          }catch(err){
            console.log("ERROR: " + err.message)
          }
    }
}

export default function* rootSaga() {
  yield fork(flow);
  yield fork(registerUser)
}
