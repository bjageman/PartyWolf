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
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text h4>Vote on the victim!</Text>
        <PlayerList
            players={players}
            voting={true}
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


export default connect(mapStateToProps, mapDispatchToProps)(SpecialVote);
