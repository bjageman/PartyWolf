import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

class PlayerSummary extends Component {
    render() {
        const title = this.props.title || "Player Summary"
        const players = this.props.players || []
        return (
            <div>
              <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        {this.props.showRole ? <th>Role</th> : null }
                        <th>Turn Died</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, i) => (
                        <tr key={i}>
                            <td>{player.user.username}</td>
                            {this.props.showRole ? <td>{player.role.name}</td> : null }
                            <td>0</td>
                        </tr>
                         )
                      )
                    }
                </tbody>
              </table>
            </div>
        )
    }
}

class ResultTable extends Component {
  render() {
      const results = this.props.votes_result || null
      const dead_players = this.props.game && this.props.game.players.filter(function(player){return player.alive == false;}) || []
      const living_players = this.props.game && this.props.game.players.filter(function(player){return player.alive == true;}) || []
      return (
          <div>
              <PlayerSummary
                  title="Death Count"
                  players={dead_players}
                  showRole
                  />
              <PlayerSummary
                  title="Survivors"
                  players={living_players} />
          </div>
      )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
