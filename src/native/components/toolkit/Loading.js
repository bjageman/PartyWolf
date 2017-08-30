import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

class Loading extends Component {

  render() {
    if (this.props.fetching == true){
    return (
      <View>
          <Text>Loading...</Text>
      </View>
    )
    }else{
        return(<View></View>)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Loading)
