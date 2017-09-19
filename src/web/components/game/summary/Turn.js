import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Link } from 'web/components/base/Link'
import { Button } from 'bjageman-react-toolkit'

import ResultTable from './ResultTable'

class SummaryTurn extends Component {

  render() {
    return (
        <div>
            <Link to="/game/menu">
                <Button raise>Continue</Button>
            </Link>
            <ResultTable />
        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SummaryTurn);
