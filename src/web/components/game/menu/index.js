import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'
import Status from './Status'
import PlayerList from '../../toolkit/PlayerList'

import VillagerVote from './VillagerVote'
import SpecialVote from './SpecialVote'
import TurnSummary from '../summary/Turn'

class Menu extends Component {

  render() {

    if (this.props.game != null) {
        if (this.props.winner != null){
            return(
                <Redirect to={{
                    pathname: '/game/results',
                    state: { from: this.props.location }
                }}/>
            )
        }
        return (
          <div >
              {this.props.winner}
            <ul>
              <li>
                <Link to={`${this.props.match.url}/villagers`}>
                  Villager Votes
                </Link>
              </li>
              <li>
                <Link to={`${this.props.match.url}/specials`}>
                  Special Vote
                </Link>
              </li>
              <li>
                <Link to={`${this.props.match.url}/status`}>
                  Status
                </Link>
              </li>
            </ul>
            <Route path={`${this.props.match.url}/villagers`} component={VillagerVote}/>
            <Route path={`${this.props.match.url}/specials`} component={SpecialVote}/>
            <Route path={`${this.props.match.url}/status`} component={TurnSummary}/>
          </div>
        )
    }else{
        return (
            <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }}/>
        )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
