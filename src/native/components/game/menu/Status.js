import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

class Status extends Component {

  render() {
    if (this.props.game && this.props.user.player){
        const user = this.props.user
        const game = this.props.game
        const living_players = game.players.filter(function(player){return player.alive == true });
        const current_turn = this.props.game.current_turn
        return (
          <View>
              <Text>Day: {current_turn} / Live Players: {living_players.length} </Text>
              <Text>Username: {user.username} / Role: {user.player.role.name}</Text>
              <Text>You are {user.player.alive ? "ALIVE" : "DEAD"}</Text>
          </View>
        )
        }else{
            return(<View></View>)
        }
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop:10,
    marginBottom:10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Status)
