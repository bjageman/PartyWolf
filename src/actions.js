import { createAction } from 'redux-act';
export const login = createAction('login');
export const logout = createAction('logout');

export const loginSuccess = createAction('login succeeded');

export const register = createAction('register');
export const registerSuccess = createAction('registration succeeded')

export const getUser = createAction('get the latest user info')
export const getUserSuccess = createAction('user info update succeeded')

export const getGames = createAction('get a listing of all public and open games')
export const getGamesSuccess = createAction('successfully got a list of games')

export const createGame = createAction('create a new game');
export const createGameSuccess = createAction('successfully created a new game')

export const addPlayer = createAction('add player to a game');
export const removePlayer = createAction('remove player from a game');

export const addPlayerSuccess = createAction('a player is added to the game')

export const assignRoles = createAction('assign roles to all players')
export const assignRolesSuccess = createAction('Roles were succesfully assigned')

export const startGame = createAction('start a game after players have joined');

export const setVote = createAction('make a vote');
export const setVoteSuccess = createAction('succesfully made a vote');
export const voteFinished = createAction('the votes are all tallied and a person is chosen')

export const gameFinished = createAction('the game is finished!')
