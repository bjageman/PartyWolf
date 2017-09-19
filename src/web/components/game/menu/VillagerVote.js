import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import Status from './Status'
import PlayerList from 'web/components/utils/PlayerList'

class VillagerVote extends Component {
  render() {
    const players = this.props.game ? this.props.game.players : []
    return (
      <div >
        <Status />
        <PlayerList
            players={players}
            aliveOnly={true}
            voting={true}
            voteType='default'
            />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VillagerVote);
