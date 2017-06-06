import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../redux/utils'

const Home = () => (
    <h1>Home</h1>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
    </div>
  </Router>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
