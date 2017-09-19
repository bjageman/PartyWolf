import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Table, TableRow } from 'bjageman-react-toolkit'


class PlayerSummary extends Component {
    render() {
        const players = this.props.players || []
        return (
            <Table headers = {[
                        "Username",
                        this.props.showRole ? "Role": null,
                        this.props.showDied ? "Turn Died" : null,
                    ]}>
            {players.map((player, i) => (
                <TableRow key={i}
                    rows ={[
                        player.user.username,
                        this.props.showRole ? player.role.name : null,
                        this.props.showDied ? "?" : null,
                     ]}
                />
            ))}
            </Table>
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
