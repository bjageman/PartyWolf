import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

class PlayerSummary extends Component {
    render() {
        const players = this.props.players || []
        return (
            <div>
              <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        {this.props.showRole ? <th>Role</th> : null }
                        {this.props.showDied ? <th>Turn Died</th> : null }
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, i) => (
                        <tr key={i}>
                            <td>{player.user.username}</td>
                            {this.props.showRole ? <td>{player.role.name}</td> : null }
                            {this.props.showDied ? <td>0</td> : null }
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
      const dead_players = this.props.game && this.props.game.players.filter(function(player){return player.alive === false;})
      const living_players = this.props.game && this.props.game.players.filter(function(player){return player.alive === true;})
      return (
          <div>
              <h3>Dead Players</h3>
              <PlayerSummary
                  title="Death Count"
                  players={dead_players}
                  showRole
                  showDied
                  />
              <h3>Survivors</h3>
              <PlayerSummary
                  title="Survivors"
                  players={living_players} />
          </div>
      )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
