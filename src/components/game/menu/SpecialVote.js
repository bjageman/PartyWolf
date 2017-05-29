import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../utils'
import { Actions } from 'react-native-router-flux';

import PlayerList from '../../toolkit/PlayerList'
import RouteButton from '../../toolkit/RouteButton'

class SpecialVote extends Component {

  render() {
    const players = this.props.game ? this.props.game.players : []
    const role = this.props.user.player.role
    const seer_sight = this.props.votes_result && this.props.votes_result.Seer ? this.props.votes_result.Seer : null
    if (role.name != "Villager"){
        return (
          <View style={styles.outerContainer}>
            <Text h4>{role.name} Vote!</Text>
            {role.name == "Seer" && seer_sight != null ? <Text>SIGHT: {seer_sight.user.username} is a {seer_sight.role.name}</Text>: null}
            <PlayerList
                players={players}
                aliveOnly={true}
                voting={true}
                voteType={role.name}
                role={role}
                />
          </View>
        )
    }else{
        return(
            <View style={styles.outerContainer}>
                <Text h2>Sorry, Villager! You can't vote here</Text>
            </View>
        )
    }


  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop:50,
    justifyContent: 'center',
    marginBottom:50,
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SpecialVote);
