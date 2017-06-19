import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

import ResultTable from './ResultTable'

class SummaryTurn extends Component {
  constructor(props){
      super(props);
  }

  render() {
    if (this.props.game != null){
        const dead_players = this.props.game.players.filter(function(player){return player.alive == false;})
        return (
            <div>
            <ResultTable />
            </div>
        )
    }else{
        return(<div><p>Loading...</p></div>)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SummaryTurn);
