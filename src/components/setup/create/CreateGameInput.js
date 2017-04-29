import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'

class CreateGameInput extends Component {
  constructor(props){
      super(props)
      this.state = {
          private: false,
      }
  }


  render() {
    return (
    <View>
      <FormLabel>Name</FormLabel>
      <FormInput />
      <FormValidationMessage>required</FormValidationMessage>
      <CheckBox
          center
          title='Make Private'
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          onPress={() => this.setState({private: !this.state.private})}
          checked={this.state.private}
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

export default CreateGameInput
