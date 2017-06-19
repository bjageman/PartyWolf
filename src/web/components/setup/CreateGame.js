import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import Container from '../toolkit/bootstrap/Container'
import CreateGameInput from './create/CreateGameInput'

class CreateGame extends Component {
  constructor(props){
      super(props);
  }

  render() {
    var code = this.props.game ? this.props.game.code : null
    if (this.props.game != null){
        return(
            <Redirect to={{
                pathname: '/game/id/' + this.props.game.id,
                state: { from: this.props.location }
            }}/>
        );
    }
    if (this.props.user != null){
        return (
          <Container>
            <p>Create Game</p>
            <p>{this.props.user.username}</p>
            <p>CODE: {code}</p>
            <CreateGameInput />
          </Container>
    )}else{
        return(
        <Container>
            <p h2>You must be logged in</p>
            <Link to='/'>
                Login
            </Link>
        </Container>
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
