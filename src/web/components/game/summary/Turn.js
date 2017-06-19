import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

import ResultTable from './ResultTable'

class SummaryTurn extends Component {

  render() {
    if (this.props.game !== null){
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
