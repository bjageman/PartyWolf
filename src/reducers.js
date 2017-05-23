import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  login, loginSuccess, logout, addUser,
  getUser, getUserSuccess,
  createGame, createGameSuccess,
  addPlayerSuccess, assignRoles, assignRolesSuccess,
  startGame, removeUser,
  setVote, setVoteSuccess, voteFinished, gameFinished
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
    return { ...state, data: payload.user };
  },
  [logout]: (state, payload) => {
    return { ...state, data: null };
  },
  [getUser]: (state, payload) => {
    return { ...state, user_id: payload.user_id, game_id: payload.game_id };
  },
  [getUserSuccess]: (state, payload) => {
    return { ...state, data: payload.user };
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
  [assignRoles]: (state, payload) => {
    return { ...state, game_id: payload.game_id };
  },
  [assignRolesSuccess]: (state, payload) => {
    return { ...state, data: payload.game };
  },
  [setVote]: (state, payload) => {
    return { ...state, voter_id: payload.voter_id, choice_id: payload.choice_id };
  },
  [setVoteSuccess]: (state, payload) => {
    return { ...state, data: payload.game };
  },
  [voteFinished]: (state, payload) => {
    return { ...state, votes_result: payload.result };
  },
  [gameFinished]: (state, payload) => {
    return { ...state, winner: payload.result };
  },
}, initial.game);


export default combineReducers(
  { user, game }
);
