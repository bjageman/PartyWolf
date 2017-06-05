import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'
import { redirection } from './utils'
import PlayerList from '../../toolkit/PlayerList'
import RouteButton from '../../toolkit/RouteButton'



class VillagerVote extends Component {

  componentDidUpdate(prevProps, prevState){
      redirection(this.props)
  }

  render() {
    const players = this.props.game ? this.props.game.players : []
    const username = this.props.username || ""

    return (
      <View style={styles.outerContainer}>
        <Text h4>Vote on the culprit! {this.props.game.current_turn}</Text>
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
