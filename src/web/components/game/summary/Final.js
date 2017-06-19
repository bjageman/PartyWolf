import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

import  ResultTable  from './ResultTable'

class SummaryFinal extends Component {
  render() {
    const winner = this.props.winner || ""
    return (
      <div>
        <h3>{winner} wins!</h3>
        <ResultTable />
        <Link to='/'><button type="button" className="btn btn-default">
            Home
        </button></Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinal);
