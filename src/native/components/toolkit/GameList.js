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

class GameList extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    renderDebug(game){
        return(
          <View>
            <Text>Players: {game.players.length}</Text>
          </View>
        )
    }

    handleClick(game){
      console.log(game.id)
        this.props.addPlayer({
            game_id: game.id,
            user_id: this.props.user.id,
        })
    }

    render(){
        games = this.props.games ? this.props.games : []
        console.log(games)
        return(
            <ScrollView>
            <Text>{this.props.user.username}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameList)
