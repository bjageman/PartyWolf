import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Tabs, Tab, Text } from 'bjageman-react-toolkit'

import VillagerVote from './VillagerVote'
import SpecialVote from './SpecialVote'
import ResultTable from '../summary/ResultTable'

class Menu extends Component {
  constructor(props){
      super(props)
      this.handleIndexChange = this.handleIndexChange.bind(this)
      this.state = { tabValue: 0, listValue: 0, specialListValue: 0 }
  }

  handleIndexChange(i){
      this.setState({ tabValue: i })
  }

  render() {
    const tabValue = this.state.tabValue
    const alive = this.props.user.player.alive
    return(
    <div style={styles.container}>
    { alive ?
        <div>
        <Tabs value={tabValue} getIndex={this.handleIndexChange}>
            <Tab>Villagers</Tab>
            <Tab>Special</Tab>
            <Tab>Status</Tab>
        </Tabs>
        { tabValue === 0 ? <VillagerVote /> : null }
        { tabValue === 1 ? <SpecialVote /> :null }
        { tabValue === 2 ? <ResultTable /> :null }
        </div>
    :
    <div>
        <Text h3>Sorry! You're DEAD! Stay quiet while the others vote</Text>
        <ResultTable />
    </div>
    }
    </div>

    )
  }
}

const styles = {
    container: {
        backgroundColor: "rgba(245,245,245 ,1)",
        width: "100%",
        maxWidth: "500px",
        minHeight: "600px"
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
