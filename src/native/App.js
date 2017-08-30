import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect, dispatch } from 'react-redux'
import { Icon } from 'react-native-elements'

import { mapStateToProps, mapDispatchToProps } from '../redux/utils'

import store from '../redux/store';
import { quitGame } from '../redux/actions';

import Home from './components/Home'
import Login from './components/users/Login'
import Registration from './components/users/Registration'
import CreateGame from './components/setup/CreateGame'
import JoinGame from './components/setup/JoinGame'
import WaitingRoom from './components/setup/WaitingRoom'
import VillagerVote from './components/game/menu/VillagerVote'
import SpecialVote from './components/game/menu/SpecialVote'
import PreviousTurnResults from './components/game/menu/PreviousTurnResults'
import RoleAssign from './components/game/RoleAssign'
import SummaryTurn from './components/game/summary/Turn'
import SummaryFinal from './components/game/summary/Final'

const TabText = ({ selected, title}) => {
    return (
      <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    )
}

const TabIcon = ({ selected, title, iname}) => {
    return (
        <Icon name={iname} color={selected ? 'red' : 'black'} />
    )
}


class App extends Component {
    cancelGame(){
        console.log("Exiting game")
        if (this.props.user.player != null) {
            console.log("THERE IS A PLAYER TO DELETE")
            store.dispatch(quitGame({
                "player_id": this.props.user.player.id
            }))
            console.log("DISPATCHED QUIT")
        }

        Actions.home({type:"reset"})

    }

  render() {
    return (
      <Router initial="landing">
        <Scene key="root">
            <Scene key="home" component={Home} title="Werewolf Home" initial={true} />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="registration" component={Registration} title="Registration" />
            <Scene key="createGame" component={CreateGame} title="Create Game" />
            <Scene key="joinGame" component={JoinGame} title="Join Game" onBack={() => this.cancelGame()} />
            <Scene key="waitingRoom" component={WaitingRoom} title="Waiting For Players" onBack={() => this.cancelGame()}  />
            <Scene key="roleAssign" component={RoleAssign} title="Your Role"  />
            <Scene key="menu" tabs={true} style={{backgroundColor: "white"}} >
                <Scene key="villagerVote" component={VillagerVote} title="Vote on Culprit" iname="home" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
                <Scene key="specialVote" component={SpecialVote} title="Special Vote" iname="stars" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
                <Scene key="previousTurnResults" component={PreviousTurnResults} title="Death Toll" iname="sentiment-very-dissatisfied" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
            </Scene>
            <Scene key="turnResults" component={SummaryTurn} title="Results"/>
            <Scene key="finalResults" component={SummaryFinal} title="Game Over!"/>
        </Scene>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
