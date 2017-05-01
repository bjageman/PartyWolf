import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Text, Button, Card, Avatar, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../utils'
import { Actions } from 'react-native-router-flux';

import { hanged_player, murdered_player } from '../../dataPlaceholder'

class PreviousTurnResults extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <ScrollView>
            <Card title='Player(s) Hanged in the Day'>
                <ListItem
                    roundAvatar
                    avatar={{uri:hanged_player.avatar_url}}
                    title={hanged_player.name}
                    hideChevron
                    />
            </Card>
            <Card title='Player(s) Murdered in the Night'>
                <ListItem
                    roundAvatar
                    avatar={{uri:murdered_player.avatar_url}}
                    title={murdered_player.name}
                    hideChevron
                    />
            </Card>
        </ScrollView>
        <Button
            title="Continue..."
            onPress={() => Actions.villagerVote({title: "Next Turn"})}
            />
        <Button
            title="End Game"
            onPress={() => Actions.finalResults()}
            />
      </View>
    )
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
