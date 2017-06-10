import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  register, registerSuccess,
  login, loginSuccess, logout,
  addPlayer, removePlayer,
  getGames, getGamesSuccess,
  createGame,
  assignRoles,
  startGame, removeUser,
  setVote, voteFinished,
  gameFinished, quitGame,
  gameUpdated, gameDeleted, gameCompleted,
  getError
} from './actions';

const initial = {
  user: {
    username: null,
    error: null,
  },
  game:{},
};

const user = createReducer({
  [register]: (state, payload) => {
    return { ...state, username: payload.username, password: payload.password, fetching:true, error: null };
  },
  [registerSuccess]: (state, payload) => {
    return { ...state, newUser: payload.username, fetching:false, error: null };
  },
  [login]: (state, payload) => {
    return { ...state, username: payload.username, password: payload.password, fetching:true, error: null };
  },
  [loginSuccess]: (state, payload) => {
    return { ...state, data: payload.user, fetching:false, error: null };
  },
  [logout]: (state, payload) => {
    return { ...state, data: null, error: null };
  },
  [getError]: (state, payload) => {
    return { ...state, fetching:false, error: payload.error, newUser: null };
  },
}, initial.user);

const game = createReducer({
  [getGames]: (state, payload) => {
    return { ...state, fetching:true, error: null}
  },
  [getGamesSuccess]: (state, payload) => {
    return { ...state, public_listing: payload.games, fetching:false, error: null };
  },
  [createGame]: (state, payload) => {
    return { ...state, user_id: payload.user_id, public: payload.public, fetching:true, error: null };
  },
  [addPlayer]: (state, payload) => {
    return { ...state, game_id: payload.game_id, user_id: payload.user_id, fetching:true, error: null };
  },
  [assignRoles]: (state, payload) => {
    return { ...state, game_id: payload.game_id, fetching:true, error: null };
  },
  [setVote]: (state, payload) => {
    return { ...state, voter_id: payload.voter_id, choice_id: payload.choice_id, fetching:true, error: null };
  },
  [quitGame]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, player_id: payload.player_id}
  },
  [gameUpdated]: (state, payload) => {
    return { ...state, data: payload.game, votes_result: payload.votes, winner: payload.winner, fetching:false, error: null  };
  },
  [gameDeleted]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, game_id: payload.game_id, fetching:false, error: null}
  },
  [gameCompleted]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, fetching:false, error: null}
  },
  [logout]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, fetching:false, error: null };
  }
}, initial.game);


export default combineReducers(
  { user, game }
);
