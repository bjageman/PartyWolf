import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer,
  getUser, getUserSuccess,
  getGames, getGamesSuccess,
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
  [register]: (state, payload) => {
    return { ...state, username: payload.username, password: payload.password };
  },
  [registerSuccess]: (state, payload) => {
    return { ...state, data: payload.user };
  },
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
  [getGames]: (state, payload) => {
    return { ...state}
  },
  [getGamesSuccess]: (state, payload) => {
    return { ...state, public_listing: payload.games };
  },
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
