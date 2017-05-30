import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'

class RouteButton extends Component {

  render() {
    const title = this.props.title || "Button"
    const route = this.props.route || ""
    const backgroundColor = this.props.backgroundColor || "Black"
    return (
      <Button
          buttonStyle={styles.button}
          title={title}
          onPress={route}
          large
          raised
          backgroundColor={backgroundColor}
          borderRadius={10}
          />
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

export default RouteButton
