import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'

class RegisterInput extends Component {
  constructor(props){
      super(props)
      this.state = {
          private: false,
      }
  }


  render() {
    return (
    <View>
      <FormLabel>Username</FormLabel>
      <FormInput />
      <FormValidationMessage>required</FormValidationMessage>
      <FormLabel>Password</FormLabel>
      <FormInput />
      <FormValidationMessage>required</FormValidationMessage>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop:10,
    marginBottom:10,
  }
})

export default RegisterInput
