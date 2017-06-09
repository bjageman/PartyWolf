import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'
import { Actions } from 'react-native-router-flux';

import  ResultTable  from './ResultTable'

class SummaryFinal extends Component {

  componentDidUpdate(prevProps, prevState){
      if (this.props.game == null) {
          Actions['home']({type: 'reset'})
      }
  }

  render() {
    const winner = this.props.winner || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>{winner} wins!</Text>
        <ResultTable />
        <Button
            title="Start a new game"
            onPress={() => this.props.gameCompleted()}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 50,
    flex: 1,
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinal);
