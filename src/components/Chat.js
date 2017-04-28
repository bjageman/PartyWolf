import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Button, Card, Text, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils'
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props){
      super(props);
  }

  renderMessage(message, i){
      console.log(message)
      return (
          <Card key={message.id}>
              <Text>
                  <Text style={{fontWeight:"bold"}}>{message.username}</Text>
                  {'\n'}
                  <Text>{message.text}</Text>
              </Text>
          </Card>
      )
  }

  render() {
    const username = this.props.username || ""
    const { users, messages } = this.props;
    console.log(messages)
    return (
      <View style={styles.container}>
        <Text h3>Welcome To Chat {username}</Text>
        <Button
            title="Log Out"
            onPress={() => this.props.logout()}
            />
        <ScrollView>
            {Object.keys(users).map((username, i) =>
              <Text>{username}</Text>
            )}
            {messages.list.map(id => messages.entities[id]).map(this.renderMessage)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    receivedMessage:{
      textAlign:"right",
      fontSize:25,
      },
     sentMessage: {
         textAlign:"left",
         fontSize:25,
     },
    container: {
    flex: 1,
    marginTop:100,
    marginBottom:80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);
