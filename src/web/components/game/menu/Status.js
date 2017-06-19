import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

class Status extends Component {

  render() {
    if (this.props.game && this.props.user.player){
        const user = this.props.user
        const game = this.props.game
        const living_players = game.players.filter(function(player){return player.alive === true });
        const current_turn = this.props.game.current_turn
        return (
          <div>
              <p>Day: {current_turn} / Live Players: {living_players.length} </p>
              <p>Username: {user.username} / Role: {user.player.role.name}</p>
              <p>You are {user.player.alive ? "ALIVE" : "DEAD"}</p>
          </div>
        )
        }else{
            return(<div></div>)
        }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status)
