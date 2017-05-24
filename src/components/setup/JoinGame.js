import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Text, Button, List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

class GameList extends Component {
    constructor(props){
        super(props)
    }

    renderDebug(game){
        return(
          <View>
            <Text>Players: {game.players.length}</Text>
          </View>
        )
    }

    render(){
        games = this.props.games ? this.props.games : []
        console.log(games)
        return(
            <ScrollView>
            <List containerStyle={{marginBottom: 20}}>
              {
                games.map((game, i) => (
                  <ListItem
                    roundAvatar
                    key={game.id}
                    title={"Owner: " + game.creator.username}
                    subtitle={this.renderDebug(game)}
                    hideChevron
                    onPress={() => this.handleClick(game)}
                  />
                ))
              }
            </List>
            </ScrollView>
        )
    }


}


class JoinGame extends Component {
  constructor(props){
      super(props);
      this.getGamesListing = this.getGamesListing.bind(this)
  }

  getGamesListing(){
      console.log("CLICK JOIN")
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
