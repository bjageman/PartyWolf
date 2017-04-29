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

class CreateGame extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>Create Game</Text>
        <CreateGameInput />
        <Button
            title="Create"
            onPress={() => Actions.waitingRoom()}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop:60,
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
