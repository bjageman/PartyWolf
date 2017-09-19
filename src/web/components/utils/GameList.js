import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Table, TableRow, Button } from 'bjageman-react-toolkit'

import myConfig from 'config.js'
const DEBUG = myConfig.DEBUG



class GameList extends React.Component {
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
        if (this.props.user){
        return(
                <Table headers = {["ID", "Owner", "Join"]}>
                  {
                    games.map((game, i) => (
                    <TableRow key={game.id}
                        rows ={[
                            game.id,
                            game.creator.username,
                            <Button raised onClick={() => this.handleClick(game)}>JOIN</Button>,
                            DEBUG ? this.renderDebug(game) : null
                         ]}
                        />
                    ))
                  }
              </Table>
        )
    }else{
        return( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> )}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(GameList)
