import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button } from 'bjageman-react-toolkit'
import Debug from 'web/components/utils/Debug'
import PlayerList from 'web/components/utils/PlayerList'

import myConfig from 'config.js'
let PLAYERMIN = myConfig.PLAYERMIN || 0

class WaitingRoom extends Component {
  constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
      e.preventDefault();
      this.props.assignRoles({
          game_id: this.props.game.id
      })
  }

  render() {
    const players = this.props.game ? this.props.game.players : []
    const user = this.props.user || null
    console.log(players.length, PLAYERMIN)
    if (user != null && user.player && this.props.game){
        return (
          <div>
            <h3>Waiting For Players...</h3>
            <Debug />
            { user.player.is_creator && players.length >= PLAYERMIN ?
            <Button raised onClick={this.handleSubmit}>
                Start Game
            </Button>
            : null }
            <PlayerList
                players={players}/>
          </div>
        )
    }else{
        return( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
