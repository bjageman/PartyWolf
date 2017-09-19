import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Card, CardContent, Button, Text } from 'bjageman-react-toolkit'
import { Link } from 'web/components/base/Link'
import GameList from '../utils/GameList'

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
        <Card>
        <CardContent>
            <Text h2>Join Game</Text>
            <Button raised onClick = {this.getGamesListing}>
                Refresh
            </Button>
            <Link to="/"><Button>Cancel</Button></Link>
        </CardContent>
        <GameList games = {this.props.public_listing} />
    </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
