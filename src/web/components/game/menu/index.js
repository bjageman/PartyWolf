import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

import VillagerVote from './VillagerVote'
import SpecialVote from './SpecialVote'
import TurnSummary from '../summary/Turn'

class Menu extends Component {

  cancelGame(){
      console.log("Exiting game")
      if (this.props.user.player !== null) {
          console.log("THERE IS A PLAYER TO DELETE")
          this.props.quitGame({
              "player_id": this.props.user.player.id
          })
          console.log("DISPATCHED QUIT")
      }

      return(
          <Redirect to={{
              pathname: '/',
              state: { from: this.props.location }
          }}/>
      )

  }


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
        const pathName = this.props.location.pathname
        return (
          <div >
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className={ pathName === `${this.props.match.url}/villagers` ? "active" : null } >
                    <Link to={`${this.props.match.url}/villagers`}>Villagers</Link>
                </li>
                <li role="presentation" className={ pathName === `${this.props.match.url}/specials` ? "active" : null }>
                    <Link to={`${this.props.match.url}/specials`}>Special</Link>
                </li>
                <li role="presentation" className={ pathName === `${this.props.match.url}/status` ? "active" : null }>
                    <Link to={`${this.props.match.url}/status`}>Status</Link>
                </li>
              </ul>
                <div role="tabpanel" className="tab-pane active" id="home">
                    <Route path={`${this.props.match.url}/villagers`} component={VillagerVote}/>
                    <Route path={`${this.props.match.url}/specials`} component={SpecialVote}/>
                    <Route path={`${this.props.match.url}/status`} component={TurnSummary}/>
                </div>
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
