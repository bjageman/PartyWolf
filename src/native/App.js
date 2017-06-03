import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect, dispatch } from 'react-redux'
import { Icon } from 'react-native-elements'

import { mapStateToProps, mapDispatchToProps } from '../redux/utils'

import store from '../redux/store';
import { quitGame } from '../redux/actions';

import { default as Home } from './components/Home'
import { default as Login } from './components/users/Login'
import { default as Registration } from './components/users/Registration'
import { default as CreateGame } from './components/setup/CreateGame'
import { default as JoinGame } from './components/setup/JoinGame'
import { default as WaitingRoom } from './components/setup/WaitingRoom'
import { default as VillagerVote } from './components/game/menu/VillagerVote'
import { default as SpecialVote } from './components/game/menu/SpecialVote'
import { default as PreviousTurnResults } from './components/game/menu/PreviousTurnResults'
import { default as RoleAssign } from './components/game/RoleAssign'
import { default as TurnResults } from './components/game/TurnResults'
import { default as FinalResults } from './components/game/FinalResults'

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
            store.dispatch(quitGame({
                "player_id": this.props.user.player.id
            }))
        }

        Actions.home({type:"reset"})

    }

  render() {
    return (
      <Router initial="landing">
        <Scene key="root">
            <Scene key="home" component={Home} title="Werewolf Home" initial={true} />
            <Scene key="users" tabs={true} style={{backgroundColor: "white"}}>
                <Scene key="login" component={Login} title="Login" />
                <Scene key="registration" component={Registration} title="Registration" />
            </Scene>
            <Scene key="createGame" component={CreateGame} title="Create Game" />
            <Scene key="joinGame" component={JoinGame} title="Join Game"  />
            <Scene key="waitingRoom" component={WaitingRoom} title="Waiting For Players" onBackAndroid={() => this.cancelGame()} onBack={() => this.cancelGame()}  />
            <Scene key="roleAssign" component={RoleAssign} title="Your Role"  />
            <Scene key="menu" tabs={true} style={{backgroundColor: "white"}} >
                <Scene key="villagerVote" component={VillagerVote} title="Vote on Culprit" iname="home" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
                <Scene key="specialVote" component={SpecialVote} title="Vote on 'Culprit'" iname="stars" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
                <Scene key="previousTurnResults" component={PreviousTurnResults} title="Death Toll" iname="sentiment-very-dissatisfied" icon={TabIcon} rightTitle="Quit" onRight={() => this.cancelGame()} />
            </Scene>
            <Scene key="turnResults" component={TurnResults} title="Results"/>
            <Scene key="finalResults" component={FinalResults} title="Game Over!"/>
        </Scene>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
