import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

import  ResultTable  from './ResultTable'

class SummaryFinal extends Component {
  render() {
    const winner = this.props.winner || ""
    return (
      <div>
        <p h3>{winner} wins!</p>
        <ResultTable />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinal);
