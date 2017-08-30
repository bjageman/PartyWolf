import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import { Actions } from 'react-native-router-flux';

import RegisterInput from './input/RegisterInput'
import ErrorHandling from '../toolkit/ErrorHandling'


class Registration extends Component {
  constructor(props){
      super(props);
  }
  componentDidUpdate(prevProps, prevState){
      if (this.props.newUser != null) {
          Alert.alert(this.props.newUser + " successfully registered!")
          Actions['home']({type: 'reset'})
      }
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ErrorHandling />
        <Text h3>Registration</Text>
        <RegisterInput />
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


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
