import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

class WaitingRoom extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>Waiting For Players...</Text>
        <Button
            title="Start Game"
            onPress={() => Actions.roleAssign()}
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


export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
