import { createAction } from 'redux-act';
export const login = createAction('login');
export const logout = createAction('logout');

export const loginSuccess = createAction('login succeeded');


export const createGame = createAction('create a new game');
export const createGameSuccess = createAction('successfully created a new game')
export const addPlayerSuccess = createAction('a player is added to the game')
export const startGame = createAction('start a game after players have joined');

export const addUser = createAction('add user');
export const removeUser = createAction('remove user');

export const makeVote = createAction('make a vote');
export const countVotes = createAction('tally up votes');
