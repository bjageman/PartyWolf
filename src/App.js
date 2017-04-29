import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from './utils'

import { default as Home } from './components/Home'
import { default as Login } from './components/users/Login'
import { default as CreateGame } from './components/setup/CreateGame'
import { default as JoinGame } from './components/setup/JoinGame'
import { default as WaitingRoom } from './components/setup/WaitingRoom'
import { default as DayMenu } from './components/game/DayMenu'
import { default as RoleAssign } from './components/game/RoleAssign'
import { default as TurnResults } from './components/game/TurnResults'
import { default as FinalResults } from './components/game/FinalResults'


class App extends Component {
  render() {
    return (
      <Router initial="landing">
        <Scene key="root">
            <Scene key="home" component={Home} title="Werewolf Home" initial={true} />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="createGame" component={CreateGame} title="Create Game" />
            <Scene key="joinGame" component={JoinGame} title="Join Game"  />
            <Scene key="waitingRoom" component={WaitingRoom} title="Waiting For Players"  />
            <Scene key="dayMenu" component={DayMenu} title="Day Menu"  />
            <Scene key="roleAssign" component={RoleAssign} title="Your Role"  />
            <Scene key="turnResults" component={TurnResults} title="Results"  />
            <Scene key="finalResults" component={FinalResults} title=""  />
        </Scene>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
