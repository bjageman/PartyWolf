import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { p } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import myConfig from '../../../../config.js';

class Loading extends Component {

  render() {
    if (this.props.fetching == true){
    return (
      <View>
          <p>Loading...</p>
      </View>
    )
    }else{
        return(<View></View>)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Loading)
