import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import Debug from '../toolkit/Debug'
import PlayerList from '../toolkit/PlayerList'


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
    if (this.props.user == null){
        return(
            <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }}/>
        )
    }
     if (this.props.user.player != null && this.props.user.player.role != null) {
        console.log("Go To roleAssign")
        return (
            <Redirect to={{
                pathname: '/game/assignment/',
                state: { from: this.props.location }
            }}/>
        )
    }
    if (user != null && user.player && this.props.game){
        return (
          <div>
            <h3>Waiting For Players...</h3>
            <Debug />
            <PlayerList
                players={players}/>
            { user.player.is_creator ?
            <input
                className="btn button"
                type="submit"
                value="Start Game"
                backgroundColor="green"
                onClick={this.handleSubmit}
                />
            : null }
          </div>
        )
    }else{
        return(
            <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }}/>
        )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
