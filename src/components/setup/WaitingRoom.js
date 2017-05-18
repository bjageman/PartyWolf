import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button, List } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

import PlayerList from '../toolkit/PlayerList'
import RouteButton from '../toolkit/RouteButton'


class WaitingRoom extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const players = this.props.game ? this.props.game.players : []
    return (
      <View style={styles.outerContainer}>
        <Text h3>Waiting For Players...</Text>
        <Text>ID: {this.props.game.id} Code:{this.props.game.code}</Text>
        <PlayerList
            players = {players}
            />
        <RouteButton
            title="Start Game"
            backgroundColor="green"
            route={() => Actions.roleAssign()}
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
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
