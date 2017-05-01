import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'



class PlayerList extends Component {
  constructor(props){
      super(props);
      this.handleVote = this.handleVote.bind(this)
  }

  handleVote(id, name){
      console.log("Vote for: " + id + ") " + name)
  }
  
  render() {
    const players = this.props.players || []
    const voting = this.props.voting || false
    return (
      <ScrollView>
      <List containerStyle={{marginBottom: 20}}>
        {
          players.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.name}
              hideChevron
              onPress={voting ? () => this.handleVote(i, l.name): null}
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

export default PlayerList
