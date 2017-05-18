import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  login, loginSuccess, logout, addUser, createGame, createGameSuccess, addPlayerSuccess, startGame, removeUser, newVote
} from './actions';

const initial = {
  user: {
    username: null
  },
  game:{},
};

const user = createReducer({
  [login]: (state, payload) => {
    return { ...state, username: payload.username, password: payload.password };
  },
  [loginSuccess]: (state, payload) => {
    return { ...state, username: payload.user.username, user_id: payload.user.id };
  },
  [logout]: (state, payload) => {
    return { ...state, username: null };
  },
}, initial.user);

const game = createReducer({
  [createGame]: (state, payload) => {
    return { ...state, user_id: payload.user_id, public: payload.public };
  },
  [createGameSuccess]: (state, payload) => {
    return { ...state, data: payload.game };
  },
  [addPlayerSuccess]: (state, payload) => {
    return { ...state, data: payload.game };
  },
}, initial.game);


export default combineReducers(
  { user, game }
);
