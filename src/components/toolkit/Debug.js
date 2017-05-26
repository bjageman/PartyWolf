import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'

class Debug extends Component {

  render() {
    if (this.props.game){
    return (
      <View>
          <Text>ID: {this.props.game.id} Code:{this.props.game.code}</Text>
          <Text>User: {this.props.user.username} {this.props.user.player.id} {this.props.user.player.role ? this.props.user.player.role.name : null}</Text>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
