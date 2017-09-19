import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

class Security extends Component {
  render() {
    if (this.props.game == null) {
        return (
            <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }}/>
        )
    }else{
        return this.props.children
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security);
