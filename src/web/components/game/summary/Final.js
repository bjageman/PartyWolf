import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button } from 'bjageman-react-toolkit'

import  ResultTable  from './ResultTable'

class SummaryFinal extends Component {
  render() {
    const winner = this.props.winner || ""
    return (
      <div>
        <h3>{winner} wins!</h3>
        <ResultTable />
        <Button raised onClick={() => this.props.gameCompleted()} >
            Home
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinal);
