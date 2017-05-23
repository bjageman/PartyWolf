import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { List, ListItem, Text } from 'react-native-elements'
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../utils';



class PlayerList extends Component {
  constructor(props){
      super(props);
      this.handleVote = this.handleVote.bind(this)
  }

  handleVote(player){
      console.log(player)
      this.props.setVote({
          voter_id: this.props.user.player.id,
          choice_id: player.id
      })
  }

  renderDebug(player){
      return(
          <Text>ID: {player.id} / {player.alive ? 'ALIVE' : 'DEAD'} / {player.role ? player.role.name : null}</Text>
      )
  }

  render() {
    const players = this.props.aliveOnly ? this.props.game.players.filter(function(player){return player.alive;}) :this.props.players
    const voting = this.props.voting || false
    return (
      <ScrollView>
      <List containerStyle={{marginBottom: 20}}>
        {
          players.map((player, i) => (
            <ListItem
              roundAvatar
              key={player.id}
              title={player.user.username}
              subtitle={this.renderDebug(player)}
              badge={ voting ? { value: player.votes } : null }
              hideChevron
              onPress={voting ? () => this.handleVote(player): null}
            />
          ))
        }
      </List>
      </ScrollView>
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
)(PlayerList)
