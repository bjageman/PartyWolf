import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { take } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { push } from 'react-router-redux'

import myConfig from 'config.js'
var url = myConfig.API_URL

export function connect() {
  const socket = io(url)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

//Handle anything the server returns
export function subscribe(socket) {
  try{
    return eventChannel(emit => {
      socket.on('user_login_success', ({ user }) => {
        emit(actions.loginSuccess({ user }))
      })
      socket.on('get_games_success', ({ games }) => {
        emit(actions.getGamesSuccess({ games }))
      })
      socket.on('game_created', ({ game }) => {
        emit(actions.gameUpdated({ game }))
        emit(push("/create/" + game.id))
      })
      socket.on('roles_assigned', ({ game }) => {
        emit(actions.gameUpdated({ game }))
        emit(push("/game/assignment"))
      })
      socket.on('game_updated', ({ game, votes, winner }) => {
        emit(actions.gameUpdated({ game, votes, winner }))
      })
      socket.on('game_deleted', ({ game_id }) => {
        emit(actions.gameDeleted({ game_id }))
      })
      socket.on('send_error', ({ error }) => {
        emit(actions.error({ error }))
      })
      socket.on('disconnect', e => {
        // TODO: handle
      })
      return () => {}
    })
  }catch(err){
    console.log("reading ERROR: " + err.message)
  }
}

export function* getGamesEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.getGames)
    socket.emit('get_games', payload)
  }
}

export function* createGameEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.createGame)
    socket.emit('create_game', payload)
  }
}

export function* quitGameEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.quitGame)
    socket.emit('quit_player', payload)
  }
}

export function* addPlayerEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.addPlayer)
    socket.emit('add_player', payload)
  }
}

export function* assignRolesEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.assignRoles)
    socket.emit('assign_roles', payload)
  }
}

export function* setVoteEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.setVote)
    socket.emit('set_vote', payload)
  }
}
