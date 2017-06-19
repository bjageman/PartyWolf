import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils';

//Set Configuration
import myConfig from '../../../config.js';

import Container from './bootstrap/Container'

class PlayerList extends Component {
  constructor(props){
      super(props);
      this.handleVote = this.handleVote.bind(this)
  }

  handleVote(player, role_id){
      console.log(player)
      if (role_id != null){
          this.props.setVote({
              voter_id: this.props.user.player.id,
              choice_id: player.id,
              role_id: role_id,
          })
      }else{
            this.props.setVote({
                voter_id: this.props.user.player.id,
                choice_id: player.id,
            })
      }

  }

  renderDebug(player){
      if (myConfig.DEBUG === true) {
          return(
            <div>
              ID: {player.id} / {player.alive ? 'ALIVE' : 'DEAD'}
              {player.role && player.role.name+ "( " + player.role.id + " ) / " + player.role.avatar } / { player.role && player.role.evil ? "EVIL" : "GOOD" } /
              {player.votes.default} / {player.votes.Werewolf} / {player.votes.Seer}
            </div>
          )
      }else{
          return(
            <div>
            </div>
          )
      }

  }

  render() {
    const players = this.props.aliveOnly && this.props.game != null ? this.props.game.players.filter(function(player){return player.alive;}) :this.props.players
    const voting = this.props.voting || false
    const role_id = this.props.role ? this.props.role.id : null
    return (
      <Container>
      <table className="table">
        <thead>
          <tr>
              <th>Username</th>
              { voting ? <th>Votes</th> : null }
              {myConfig.DEBUG ? <th>DEBUG</th> : null }
              {voting ? <th>Choose</th> : null}
          </tr>
        </thead>
        <tbody>
        {
          players.map((player, i) => (
            <tr key={i} >
                <th>{player.user.username}</th>
                { voting ? <td>{ player.votes[this.props.voteType]}</td> : null }
                { myConfig.DEBUG ? <td>{this.renderDebug(player)}</td> : null }
                {voting ? <td><input type="submit" value="VOTE" onClick={() => this.handleVote(player, role_id)} /></td> : <td></td> }
            </tr>
          ))
        }
        </tbody>
    </table>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)
