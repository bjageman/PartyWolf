import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Button, Text } from 'react-native-elements'

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../utils';


class LoginInput extends Component {
  constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state ={
          username:"",
          password:"",
      }
  }

  handleSubmit(e){
      e.preventDefault();
      console.log("Submitting login: " + this.state.username)
      this.props.login({
          username: this.state.username,
          password: this.state.password
      })
  }


  render() {
    return (
    <View>
      <FormLabel>Username</FormLabel>
      <FormInput
          name='username'
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          />
      <FormValidationMessage>required</FormValidationMessage>
      <FormLabel>Password</FormLabel>
      <FormInput
          name='password'
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />
      <FormValidationMessage>required</FormValidationMessage>
      <Button
          title="Login"
          backgroundColor="green"
          onPress={this.handleSubmit}
          />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInput)
