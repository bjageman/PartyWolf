import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

class TurnResults extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>Results of the previous day</Text>
        <Button
            title="Continue..."
            onPress={() => Actions.dayMenu()}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(TurnResults);
