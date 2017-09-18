import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'

import { history } from 'redux/store'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import NavBar from './components/base/NavBar'
import Security from './components/toolkit/Security'

import Home from './components/Home'
import Register from './components/users/Register'
import JoinGame from './components/setup/JoinGame'
import CreateGame from './components/setup/CreateGame'
import WaitingRoom from './components/setup/WaitingRoom'
import RoleAssign from './components/game/RoleAssign'
import Menu from './components/game/menu/index'
import FinalSummary from './components/game/summary/Final'

import { Grid } from 'bjageman-react-toolkit'


const App = () => (
  <ConnectedRouter history={history}>
    <div>
      <Route path="/" component={NavBar}/>
      <Grid>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/games" component={JoinGame}/>
          <Route exact path="/create" component={CreateGame}/>
          <Route path="/create/:id" component={WaitingRoom}/>
          <Route path="/game/" component={Security} />
          <Route path="/game/assignment" component={RoleAssign}/>
          <Route path="/game/menu" component={Menu} />
          <Route path="/game/results" component={FinalSummary} />
      </Grid>
    </div>
  </ConnectedRouter>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
