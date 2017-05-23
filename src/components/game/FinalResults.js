import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils'
import { Actions } from 'react-native-router-flux';

class FinalResults extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const winner = this.props.winner || ""
    return (
      <View style={styles.outerContainer}>
        <Text h3>{winner} win!</Text>
        <Image
          style={{width: 300, height: 400}}
          source={{uri: 'https://placekitten.com/g/300/400'}}
        />
        <Button
            title="Start a new game"
            onPress={() => Actions.home()}
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


export default connect(mapStateToProps, mapDispatchToProps)(FinalResults);
