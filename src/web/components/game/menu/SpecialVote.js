import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import PlayerList from 'web/components/toolkit/PlayerList'

class SpecialVote extends Component {

  render() {
    const players = this.props.game ? this.props.game.players : []
    const werewolves = players ? players.filter(function(player){return player.role.name === "Werewolf";}) : []
    const role = this.props.user.player.role
    const seer_sight = this.props.votes_result && this.props.votes_result.Seer ? this.props.votes_result.Seer : null
    if (role.name !== "Villager"){
        return (
          <div>
            <p h4>{role.name} Vote!</p>
            {role.name === "Seer" && seer_sight !== null ? <p>SIGHT: {seer_sight.user.username} is a {seer_sight.role.name}</p>: null}
            {role.name === "Werewolf" ? <p> WereWolves: {werewolves.map((player, i) => ( <div>{player.user.username}</div> )) } </p> : null}
            <PlayerList
                players={players}
                aliveOnly={true}
                voting={true}
                voteType={role.name}
                role={role}
                />
          </div>
        )
    }else{
        return(
            <div>
                <p h2>Sorry, Villager! You can't vote here</p>
            </div>
        )
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialVote);
