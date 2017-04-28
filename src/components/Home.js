import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils'
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props){
      super(props);
  }

  handleLogin(username) {
    console.log('username', username);
    if (username && 0 < username.length) {
      this.props.login({ username });
    }
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text>Welcome Home {username}</Text>
        <Button
            title="Login"
            onPress={() => this.handleLogin("herpderp")}
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);
