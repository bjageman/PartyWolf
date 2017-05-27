import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer,
  getUser, getUserSuccess,
  getGames, getGamesSuccess,
  createGame, createGameSuccess,
  addPlayerSuccess, joinGameSuccess,
  assignRoles, assignRolesSuccess,
  setVote, setVoteSuccess, voteFinished, gameFinished
} from './actions';
import {Actions} from 'react-native-router-flux'
import { postDataApi, fetchDataApi, verifyData } from './api'


function connect() {
  const socket = io('http://192.168.1.111:5000');
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
      Actions['home']({type: 'reset'})
    });
    socket.on('get_user_success', ({ user }) => {
      emit(getUserSuccess({ user }));
    });
    socket.on('get_games_success', ({ games }) => {
      console.log("Got Games")
      emit(getGamesSuccess({ games }));
      console.log("Emitted")
    });
    socket.on('create_game_success', ({ game }) => {
      emit(createGameSuccess({ game }));
      Actions['waitingRoom']()
    });
    socket.on('add_player_success', ({ game }) => {
      emit(addPlayerSuccess({ game }));
    });
    socket.on('join_game_success', ({game}) => {
      emit(joinGameSuccess({ game }));
      Actions['waitingRoom']()
    });
    socket.on('assign_roles_success', ({ game }) => {
      emit(assignRolesSuccess({ game }));
      Actions['roleAssign']({type: 'reset'})
    });
    socket.on('vote_success', ({ game }) => {
      emit(setVoteSuccess({ game }));
    });
    socket.on('vote_final', ({ results, game }) => {
      emit(voteFinished({ results, game }));
      Actions['turnResults']({type: 'reset'})
    });
    socket.on('game_final', ({ result }) => {
      emit(gameFinished({ result }));
      Actions['finalResults']({type: 'reset'})
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* readSockets(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
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
    Actions['home']()
  }
}

function* registerUser() {
    while (true) {
        try{
          let { payload } = yield take(`${register}`);
          let data = {"username": payload.username, "password": payload.password }
          const response = yield call(postDataApi, 'users', data);
          if (verifyData(response)) {
              registerSuccess(response.data)
              Actions['home']()
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
