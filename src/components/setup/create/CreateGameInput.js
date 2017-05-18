import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../../utils';

import RouteButton from '../../toolkit/RouteButton'


class CreateGameInput extends Component {
  constructor(props){
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          gameName: "",
          public: false,
      }
  }

  handleSubmit(e){
      e.preventDefault();
      console.log(this.state.gameName)
      this.props.createGame({
          user_id: this.props.user.user_id,
          //name: this.state.gameName,
         public: this.state.public
      })
  }


  render() {
    return (
        <View>
          <Text>{this.props.user.username} {this.props.user.user_id}</Text>
          <FormLabel>Game Name {this.state.gameName}</FormLabel>
          <FormInput
              name='gameName'
              onChangeText={(gameName) => this.setState({gameName})}
              value={this.state.gameName}
              />
          <FormValidationMessage>required</FormValidationMessage>
          <CheckBox
              center
              title='Make Private'
              iconType='material'
              checkedIcon='clear'
              uncheckedIcon='add'
              onPress={() => this.setState({public: !this.state.public})}
              checked={this.state.public}
              />
          <Button
              title="Create"
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
)(CreateGameInput)
