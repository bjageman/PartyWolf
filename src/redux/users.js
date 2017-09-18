import { postDataApi, verifyData } from './api'
import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import * as actions from 'redux/actions';


export function* loginUser(socket) {
  while (true) {
    const { payload } = yield take(actions.login);
    socket.emit('login', { username: payload.username, password: payload.password });
  }
}

export function* registerUser() {
    while (true) {
        try{
          let { payload } = yield take(actions.register);
          let data = {"username": payload.username, "password": payload.password }
          const response = yield call(postDataApi, 'users', data);
          if (verifyData(response)) {
              console.log(response.data.username + " successfully registered!")
              yield put(actions.registerSuccess(response.data))
              yield put(push("/"))
            }else{
              var error = response.data.error
              console.log(error)
              yield put(actions.error({ error }))
            }
          }catch(error){
            console.log(error.message)
            yield put(actions.error({ "error": error.message }))
          }
    }
}
