import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

import GameList from '../toolkit/GameList'

class JoinGame extends Component {
  constructor(props){
      super(props);
      this.getGamesListing = this.getGamesListing.bind(this)
  }

  componentDidMount(){
      this.getGamesListing()
  }

  getGamesListing(){
      this.props.getGames({})
  }


  render() {
    if (this.props.game != null){
        return(
            <Redirect to={{
                pathname: '/game/id/' + this.props.game.id,
                state: { from: this.props.location }
            }}/>
        );
    }else{
        return (
          <div>
            <h3>Join Game</h3>
            <input
                class="btn btn-primary"
                type="submit"
                title = "Refresh"
                onClick = {this.getGamesListing}
                />
            <GameList
                games = {this.props.public_listing}
                />

          </div>
        )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
