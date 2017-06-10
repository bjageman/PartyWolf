import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackAndroid,
  Alert
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
      if (this.props.game == null) {
          console.log("Game was deleted")
          Alert.alert("Current game was deleted")
          Actions['home']({type:'reset'})
      }else if (this.props.user.player.role != null) {
          console.log("Go TO roleAssign")
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
    const user = this.props.user || null
    if (user.player && this.props.game){
        return (
          <View style={styles.outerContainer}>
            <Text h3>Waiting For Players...</Text>
            <Debug />
            <PlayerList
                players = {players}
                />
            { user.player.is_creator ?
            <Button
                title="Start Game"
                backgroundColor="green"
                onPress={this.handleSubmit}
                />
            : null }
          </View>
        )
    }else{
        return(
            <View style={styles.outerContainer}><Text h4>No Game Here</Text></View>
        )
    }
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
