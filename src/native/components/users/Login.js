import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import { Actions } from 'react-native-router-flux';

import LoginInput from './input/LoginInput'
import RouteButton from '../toolkit/RouteButton'


class Login extends Component {
  constructor(props){
      super(props);
  }

  componentDidUpdate(prevProps, prevState){
      console.log("prevProps: " + prevProps)
      if (this.props.user != null) {
          Actions['home']({type: 'reset'})
      }
  }


  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>Login Page</Text>
        <LoginInput />
        <RouteButton
            title="Registration"
            backgroundColor="red"
            route={() => Actions.registration()}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
