import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

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
            <Link to='/game/menu/villagers'>
                <h4>You are a...</h4>
                <h3>{role.name}!</h3>
                <img
                  style={imageStyle}
                  alt="role"
                  src={role.avatar}
                />
            <br />
            {" "}
            <button type="button" className="btn btn-default btn-lg">Next</button>
            </Link>
        </div>
        )
        }
    }
}

const imageStyle = {
  height: 180,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);
