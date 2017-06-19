import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import myConfig from '../../../config.js';

class ErrorHandling extends Component {
  componentDidUpdate(prevProps, prevState){
      if (this.props.error != null){
          Alert.alert("ERROR: " + this.props.error)
      }
  }

  render(){
      return(<View></View>)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandling)
