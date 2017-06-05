import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer, joinGameSuccess,
  getUser, getUserSuccess,
  getGames, getGamesSuccess,
  createGame, createGameSuccess,
  addPlayerSuccess, assignRoles, assignRolesSuccess,
  startGame, removeUser,
  setVote, setVoteSuccess, voteFinished,
  gameFinished, quitGame, quitGameSuccess,
  gameUpdated
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
  [addPlayer]: (state, payload) => {
    return { ...state, game_id: payload.game_id, user_id: payload.user_id };
  },
  [assignRoles]: (state, payload) => {
    return { ...state, game_id: payload.game_id };
  },
  [setVote]: (state, payload) => {
    return { ...state, voter_id: payload.voter_id, choice_id: payload.choice_id };
  },
  [voteFinished]: (state, payload) => {
    return { ...state, votes_result: payload.results, data: payload.game  };
  },
  [gameFinished]: (state, payload) => {
    return { ...state, winner: payload.result  };
  },
  [quitGame]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, player_id: payload.player_id}
  },
  [gameUpdated]: (state, payload) => {
    return { ...state, data: payload.game, votes_result: payload.votes, winner: payload.winner  };
  },
}, initial.game);


export default combineReducers(
  { user, game }
);
