import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from './utils'

import { default as Home } from './components/Home'
import { default as Chat } from './components/Chat'

class App extends Component {
  render() {
    return (
      <Router initial="landing">
        <Scene key="root">
          <Scene key="home" component={Home} title="Home Page" initial={true} />
          <Scene key="chat" component={Chat} title="Chat Page" />
        </Scene>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
