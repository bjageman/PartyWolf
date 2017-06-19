import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import Debug from '../toolkit/Debug'

class RoleAssign extends Component {
  render() {
    const user = this.props.user || null
    const player = user != null && user.player
    const role = player != null && player.role
    if ( role == null ){
        return(
            <div>
                <p>Errored</p>
            </div>
        )
    }else{
        return (
          <div>

            <p h4>You are a...</p>
            <Debug />
            <img
              alt="role"
              src={role.avatar}
            />
        <p h3>{role.name}!</p>
            <Link to='/game/menu/villagers'>
                Go To Sleep
            </Link>
          </div>
        )
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);
