import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

import Debug from '../toolkit/Debug'

class RoleAssign extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>

        <Text h4>You are a...</Text>
        <Debug />
        <Image
          style={{width: 300, height: 400}}
          source={{uri: this.props.user.player.role.avatar }}
        />
    <Text h3>{this.props.user.player.role.name}!</Text>
        <Button
            title="Go to sleep..."
            onPress={() => Actions.menu()}
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


export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);
