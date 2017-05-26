import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils'
import { Actions } from 'react-native-router-flux';

//Custom components
import RouteButton from './toolkit/RouteButton'

class PlaceHolderTitle extends Component {
  constructor(props){
      super(props);
      this.renderDebug = this.renderDebug.bind(this)
      this.handleJoinGame = this.handleJoinGame.bind(this)
  }

  renderDebug(){
      if (this.props.user != null){
          return(
              <View>
                  <Text>{this.props.user.username}</Text>
                  <Text>{this.props.public_listing && this.props.public_listing.length > 0 ? this.props.public_listing[0].code : "NO GAME"}</Text>
              </View>
          )
      }
  }

  handleJoinGame(){
      console.log("CLICK JOIN")
      this.props.getGames({})
  }

  render() {
    if (this.props.user){
        return (
          <View style={styles.outerContainer}>
            <Text style={styles.introHeader} h3>Werewolf</Text>
            {this.renderDebug()}
            <RouteButton
                title="Create Game"
                backgroundColor="blue"
                route={() => Actions.createGame()}
                />
            <RouteButton
                title="Join Game"
                backgroundColor="cyan"
                route={() => Actions.joinGame()}
                />
          </View>
        )
    }else{
        return (
          <View style={styles.outerContainer}>
            <Text style={styles.introHeader} h3>Werewolf</Text>
            <RouteButton
                title="Login"
                backgroundColor="green"
                route={() => Actions.login()}
                />
            <RouteButton
                title="Register"
                backgroundColor="red"
                route={() => Actions.registration()}
                />
          </View>
        )
    }

  }
}

const styles = StyleSheet.create({
  introHeader: {
      marginBottom: 30,
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
},
})


export default connect(mapStateToProps, mapDispatchToProps)(PlaceHolderTitle);
