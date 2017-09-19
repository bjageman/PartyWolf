import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button } from 'bjageman-react-toolkit'

import myConfig from 'config.js'
const DEBUG = myConfig.DEBUG

class Table extends React.Component {
    render(){
        const headers = this.props.headers
        return(
            <table style={styles.table}>
                <thead>
                    <tr>
                        { headers.map((header, i) =>
                            <th>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
          </table>
        )
    }
}

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
        console.log(games)
        if (this.props.user){
        return(
            <div style={styles.container}>
                <Table headers = {["ID", "Owner", "Join"]}>
                  {
                    games.map((game, i) => (
                    <tr key={game.id} >
                        <td style={styles.cell}>{game.id}</td>
                        <td style={styles.cell}>{game.creator.username}</td>
                        <td style={styles.cell}>
                            <Button raised onClick={() => this.handleClick(game)}>JOIN</Button>
                        </td>
                        { DEBUG ? <td style={styles.cell}>{this.renderDebug(game)}</td> : null }
                    </tr>
                    ))
                  }
              </Table>
            </div>
        )
    }else{
        return( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> )}
    }
}

const styles = {
    container: {
        marginTop: "5px",
        overflowX:"auto",
    },
    table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
        width: "100%",
        border: "1px solid #ddd",
    },
    cell: {
        border: "none",
        textAlign: "left",
        padding: "8px",
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList)
