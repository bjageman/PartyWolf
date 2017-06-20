import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import CreateGameInput from './create/CreateGameInput'

class CreateGame extends Component {
  render() {
    var code = this.props.game ? this.props.game.code : null
    if (this.props.game != null){
        return(
            <Redirect to={{
                pathname: '/create/id/' + this.props.game.id,
                state: { from: this.props.location }
            }}/>
        );
    }
    if (this.props.user != null){
        return (
          <div>
            <p>Are you sure you want to create a game?</p>
            <CreateGameInput />
          </div>
    )}else{
        return(
        <div>
            <p h2>You must be logged in</p>
            <Link to='/'>
                Login
            </Link>
        </div>
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
