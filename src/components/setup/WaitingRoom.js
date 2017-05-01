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

//Temporary Placeholder Data
import { players } from '../dataPlaceholder.js'

class WaitingRoom extends Component {
  constructor(props){
      super(props);
  }

  render() {

    return (
      <View style={styles.outerContainer}>
        <Text h3>Waiting For Players...</Text>
        <PlayerList
            players={players}
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
