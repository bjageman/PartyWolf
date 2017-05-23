import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

import CreateGameInput from './create/CreateGameInput'
import RouteButton from '../toolkit/RouteButton'


class CreateGame extends Component {
  constructor(props){
      super(props);
  }

  render() {
    code = this.props.game ? this.props.game.code : null
    if (this.props.user != null){
        return (
          <View style={styles.outerContainer}>
            <Text h3>Create Game</Text>
            <Text>{this.props.user.username}</Text>
            <Text>CODE: {code}</Text>
            <CreateGameInput />
          </View>
    )}else{
        return(
        <View style={styles.outerContainer}>
            <Text h2>You must be logged in</Text>
            <RouteButton
                title="Login"
                backgroundColor="green"
                route={() => Actions.login()}
                />
        </View>
    )}
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop:60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
