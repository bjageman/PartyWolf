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

import { ResultTable } from './ResultTable'

class SummaryTurn extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const results = this.props.votes_result || null
    if (results != null){
        const dead_players = this.props.game.players.filter(function(player){return player.alive == false;})
        return (
            <View>
            <Button
              title="Continue..."
              onPress={() => Actions.menu({title: "Next Turn"})}
              />
            </View>
        )
    }else{
        return(<View><Text>Loading...</Text></View>)
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


export default connect(mapStateToProps, mapDispatchToProps)(SummaryTurn);
