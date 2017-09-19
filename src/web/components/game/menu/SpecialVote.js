import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import PlayerList from 'web/components/utils/PlayerList'

import { Card, CardContent, Text } from 'bjageman-react-toolkit'

class SpecialVote extends Component {

  render() {
    const players = this.props.game ? this.props.game.players : []
    const werewolves = players ? players.filter(function(player){return player.role.name === "Werewolf";}) : []
    const role = this.props.user.player.role
    const seer_sight = this.props.votes_result && this.props.votes_result.Seer ? this.props.votes_result.Seer : null
    if (role.name !== "Villager"){
        return (
          <Card>
            <CardContent>
            <Text h3>{role.name} Vote!</Text>
            {role.name === "Seer" && seer_sight !== null ?
                <Text>SIGHT: {seer_sight.user.username} is a {seer_sight.role.name}</Text>
            : null}
            {role.name === "Werewolf" ?
                <Text> WereWolves: {werewolves.map((player, i) => ( <div>{player.user.username}</div> )) } </Text>
            : null}
            <PlayerList
                players={players}
                aliveOnly={true}
                voting={true}
                voteType={role.name}
                role={role}
                />
            </CardContent>
        </Card>
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
