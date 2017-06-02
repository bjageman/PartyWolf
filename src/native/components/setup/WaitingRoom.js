import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackAndroid
} from 'react-native'
import { Text, Button, List } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import { Actions } from 'react-native-router-flux';

import PlayerList from '../toolkit/PlayerList'
import Debug from '../toolkit/Debug'


class WaitingRoom extends Component {
  constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
      console.log("prevProps: " + prevProps)
      if (this.props.user.player != null) {
          Actions['roleAssign']({type: 'reset'})
      }
  }

  handleSubmit(e){
      e.preventDefault();
      this.props.assignRoles({
          game_id: this.props.game.id
      })
  }

  render() {
    const players = this.props.game ? this.props.game.players : []
    return (
      <View style={styles.outerContainer}>
        <Text h3>Waiting For Players...</Text>
        <Debug />
        <PlayerList
            players = {players}
            />
        <Button
            title="Start Game"
            backgroundColor="green"
            onPress={this.handleSubmit}
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
