import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import myConfig from '../../../config.js';

class Debug extends Component {

  render() {
    if (myConfig.DEBUG === true && this.props.game){
    return (
      <div id="debug">
          <p>ID: {this.props.game.id} Code:{this.props.game.code}</p>
          <p>User: {this.props.user.username} {this.props.user.player.id} {this.props.user.player.role ? this.props.user.player.role.name : null}</p>

      </div>
    )
    }else{
        return(<div id="debug"></div>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
