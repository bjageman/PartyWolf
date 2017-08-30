import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'

class GameList extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    renderDebug(game){
        return(
        <div>
          Players: {game.players.length}
        </div>
        )
    }

    handleClick(game){
      console.log(game.id)
        this.props.addPlayer({
            game_id: game.id,
            user_id: this.props.user.id,
        })
    }

    render(){
        var games = this.props.games ? this.props.games : []
        console.log(games)
        if (this.props.user == null){
            return(
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }}/>
            )
        }else{
        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID #</th>
                            <th>Owner</th>
                            <th>Debug</th>
                            <th>Join</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                  {
                    games.map((game, i) => (
                      <tr key={game.id} >
                        <td>{game.id}</td>
                        <td>{game.creator.username}</td>
                        <td>{this.renderDebug(game)}</td>
                        <td><input class="btn btn-success" type="submit" value="join" onClick={() => this.handleClick(game)} /></td>
                      </tr>
                    ))
                  }
              </table>
            </div>
        )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList)
