import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Text, Button, List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'
import { Actions } from 'react-native-router-flux';

import GameList from '../toolkit/GameList'

class JoinGame extends Component {
  constructor(props){
      super(props);
      this.getGamesListing = this.getGamesListing.bind(this)
  }

  componentDidMount(){
      this.getGamesListing()
  }

  getGamesListing(){
      this.props.getGames({})
  }


  render() {
    const username = this.props.username || ""
    console.log(this.props.public_listing)
    return (
      <View style={styles.outerContainer}>
        <Text h3>Join Game</Text>
        <Button
            title = "Refresh"
            onPress = {this.getGamesListing}
            />
        <GameList
            games = {this.props.public_listing}
            />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop:50,
    justifyContent: 'center',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
