import { createAction } from 'redux-act';
export const login = createAction('login');
export const logout = createAction('logout');

export const loginSuccess = createAction('login succeeded');

export const register = createAction('register');
export const registerSuccess = createAction('registration succeeded')

export const getGames = createAction('get a listing of all public and open games')
export const getGamesSuccess = createAction('successfully got a list of games')

export const createGame = createAction('create a new game');

export const addPlayer = createAction('add player to a game');
export const removePlayer = createAction('remove player from a game');

export const joinGameSuccess = createAction('the specific user has successfully joined a game (not a global call)')

export const assignRoles = createAction('assign roles to all players')

export const startGame = createAction('start a game after players have joined');
export const quitGame = createAction('quit the game');

export const setVote = createAction('make a vote');

export const voteFinished = createAction('the votes are all tallied and a person is chosen')

export const gameUpdated = createAction('the server sent an update for the current game')
export const gameDeleted = createAction('the game was deleted and players should be booted to lobby')
export const gameCompleted = createAction('the game has completed and current data should be wiped.')
