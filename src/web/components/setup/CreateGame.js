import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Card, CardContent } from 'bjageman-react-toolkit'

import CreateGameInput from './CreateGameInput'

class CreateGame extends Component {
  render() {
    if (this.props.user != null){
        return (
              <Card>
                  <CardContent>
                    <p>Are you sure you want to create a game?</p>
                    <CreateGameInput />
                  </CardContent>
              </Card>
    )}else{
        return(
            <Card>
                <CardContent>
                    <p>You must be logged in</p>
                    <Link to='/'>
                        Login
                    </Link>
                </CardContent>
            </Card>
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
