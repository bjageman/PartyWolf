import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, GridItem, Card, CardContent } from 'bjageman-react-toolkit'

class Status extends Component {

  render() {
    if (this.props.game && this.props.user.player){
        const user = this.props.user
        const game = this.props.game
        const living_players = game.players.filter(function(player){return player.alive === true });
        const current_turn = this.props.game.current_turn
        return (
          <Card>
              <CardContent>
                  <Grid>
                      <GridItem>Day: {current_turn} |</GridItem>
                      <GridItem>Live Players: {living_players.length} |</GridItem>
                      <GridItem>Name: {user.username} |</GridItem>
                      <GridItem>Role: {user.player.role.name} |</GridItem>
                      <GridItem>{user.player.alive ? "ALIVE" : "DEAD"} |</GridItem>
                  </Grid>
              </CardContent>
          </Card>
        )
        }else{
            return(<div></div>)
        }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Status)
