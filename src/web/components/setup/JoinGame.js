import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <div>
        <h3>Join Game</h3>
        <input
            class="btn btn-primary"
            type="submit"
            value="Refresh"
            onClick = {this.getGamesListing}
            />
        <GameList
            games = {this.props.public_listing}
            />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
