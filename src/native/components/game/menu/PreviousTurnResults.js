import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Text, Button, Card, Avatar, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'
import { Actions } from 'react-native-router-flux';

class PreviousTurnResults extends Component {
  constructor(props){
      super(props);
  }


  componentDidUpdate(prevProps, prevState){
      console.log("prevProps: " + prevProps)
      if (this.props.winner != null){
          Actions['finalResults']({type: 'reset'})
      }
      else if (this.props.votes_result != null) {
          Actions['turnResults']({type: 'reset'})
      }
  }

  render() {
    const results = this.props.votes_result
    const dead_players = this.props.game.players.filter(function(player){return player.alive == false;})
    if (results){
        return (
            <View style={styles.outerContainer}>
                <ScrollView>
                    <Card title='Player(s) Hanged in the Day'>
                        <ListItem
                            roundAvatar
                            title={results.default.user.username}
                            hideChevron
                            />
                    </Card>
                    <Card title='Player(s) Murdered in the Night'>
                        <ListItem
                            roundAvatar
                            title={results.Werewolf ? results.Werewolf.user.username : null}
                            hideChevron
                            />
                    </Card>
                    <Card title='Death Toll'>
                    {
                      dead_players.map((player, i) => (
                             <ListItem
                                 roundAvatar
                                 key={player.id}
                                 title={player.user.username}
                                 hideChevron
                                 />
                         )
                      )
                    }
                    </Card>
                </ScrollView>
            </View>
        )
    }else{
        return(
            <Text h4>No one's dead yet! Come back later</Text>
        )
    }

  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop:50,
    marginBottom:50,
    justifyContent: 'center',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(PreviousTurnResults);
