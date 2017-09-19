import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from 'redux/actions'
import { routerReducer } from 'react-router-redux'

const initial = {
  user: {
    username: null,
    error: null,
  },
  game:{},
  response: {
      error: null,
      success: null,
  }
};

const user = createReducer({
  [actions.register]: (state, payload) => {
    return { ...state, username: payload.username, password: payload.password, fetching:true, error: null };
  },
  [actions.registerSuccess]: (state, payload) => {
    return { ...state, newUser: payload.username, fetching:false, error: null };
  },
  [actions.login]: (state, payload) => {
    return { ...state, username: payload.username, fetching:true, error: null };
  },
  [actions.loginSuccess]: (state, payload) => {
    return { ...state, data: payload.user, fetching:false, error: null };
  },
  [actions.logout]: (state, payload) => {
    return { ...state, data: null, error: null };
  },
}, initial.user);

const game = createReducer({
  [actions.getGames]: (state, payload) => {
    return { ...state, fetching:true, error: null}
  },
  [actions.getGamesSuccess]: (state, payload) => {
    return { ...state, public_listing: payload.games, fetching:false, error: null };
  },
  [actions.createGame]: (state, payload) => {
    return { ...state, user_id: payload.user_id, public: payload.public, fetching:true, error: null };
  },
  [actions.addPlayer]: (state, payload) => {
    return { ...state, game_id: payload.game_id, user_id: payload.user_id, fetching:true, error: null };
  },
  [actions.assignRoles]: (state, payload) => {
    return { ...state, game_id: payload.game_id, fetching:true, error: null };
  },
  [actions.setVote]: (state, payload) => {
    return { ...state, voter_id: payload.voter_id, choice_id: payload.choice_id, fetching:true, error: null };
  },
  [actions.quitGame]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, player_id: payload.player_id}
  },
  [actions.gameUpdated]: (state, payload) => {
    return { ...state, data: payload.game, votes_result: payload.votes, winner: payload.winner, fetching:false, error: null  };
  },
  [actions.gameDeleted]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, game_id: payload.game_id, fetching:false, error: null}
  },
  [actions.gameCompleted]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, fetching:false, error: null}
  },
  [actions.logout]: (state, payload) => {
    return { ...state, data: null, winner: null, votes_result: null, fetching:false, error: null };
  }
}, initial.game);

const response = createReducer({
  [actions.success]: (state, payload) => {
    return { success: payload.message, loading: false };
  },
  [actions.error]: (state, payload) => {
    return { error: payload.message || "Unknown Error", loading: false };
  },
  [actions.clear]: (state, payload) => {
    return { error: null, success: null };
  }
}, initial.response);

export default combineReducers(
  { user, game, response, router: routerReducer }
);
