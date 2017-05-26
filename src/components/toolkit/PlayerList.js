import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native'
import { List, ListItem, Text } from 'react-native-elements'
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../utils';



class PlayerList extends Component {
  constructor(props){
      super(props);
      this.handleVote = this.handleVote.bind(this)
  }

  handleVote(player, role_id){
      console.log(player)
      if (role_id != null){
          this.props.setVote({
              voter_id: this.props.user.player.id,
              choice_id: player.id,
              role_id: role_id,
          })
      }else{
            this.props.setVote({
                voter_id: this.props.user.player.id,
                choice_id: player.id,
            })
      }

  }

  renderDebug(player){
      return(
        <View>
          <Text>ID: {player.id} / {player.alive ? 'ALIVE' : 'DEAD'}</Text>
          <Text>{player.role && player.role.name+ "( " + player.role.id + " ) / " + player.role.avatar } / { player.role && player.role.evil ? "EVIL" : "GOOD" }</Text>
          <Text>{player.votes.default} / {player.votes.Werewolf} / {player.votes.Seer}</Text>
    </View>
      )
  }

  render() {
    const players = this.props.aliveOnly ? this.props.game.players.filter(function(player){return player.alive;}) :this.props.players
    const voting = this.props.voting || false
    const role_id = this.props.role ? this.props.role.id : null
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
              badge={ voting ? { value: player.votes[this.props.voteType]} : null }
              hideChevron
              onPress={voting ? () => this.handleVote(player, role_id): null}
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
