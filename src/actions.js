import { createAction } from 'redux-act';
export const login = createAction('login');
export const logout = createAction('logout');

export const addUser = createAction('add user');
export const removeUser = createAction('remove user');

export const makeVote = createAction('make a vote');
