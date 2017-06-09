import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'
import { redirection } from './utils'
import Status from './Status'
import PlayerList from '../../toolkit/PlayerList'
import RouteButton from '../../toolkit/RouteButton'



class VillagerVote extends Component {

  componentDidUpdate(prevProps, prevState){
      console.log("VILLAGER VOTE")
      redirection(this.props)
  }

  render() {
    const players = this.props.game ? this.props.game.players : []
    const username = this.props.username || ""

    return (
      <View style={styles.outerContainer}>
        <Status />
        <PlayerList
            players={players}
            aliveOnly={true}
            voting={true}
            voteType='default'
            />
      </View>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(VillagerVote);
