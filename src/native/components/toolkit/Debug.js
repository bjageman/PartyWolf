import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import { myConfig } from '../../../../config.js';

class Debug extends Component {

  render() {
    if (myConfig.DEBUG == true && this.props.game){
    return (
      <View>
          <Text>ID: {this.props.game.id} Code:{this.props.game.code}</Text>
          <Text>User: {this.props.user.username} {this.props.user.player.id} {this.props.user.player.role ? this.props.user.player.role.name : null}</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
