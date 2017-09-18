import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { ListSelect, ListSelectItem, Avatar, Icon, Button, Text } from 'bjageman-react-toolkit'
import myConfig from 'config.js'

class PlayerListItem extends React.Component {
    render(){
        const player = this.props.player
        const voting = this.props.voting
        const votes = this.props.votes
        const role_id = this.props.role_id
        const avatar = "http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg"
        return(
            <div onClick={voting ? () => this.props.handleVote(player, role_id) : null} style={styles.container}>
                <div style={{flex: 1, padding:"10px"}}>
                { this.props.selected ?
                    <Icon name="check" avatar />
                    :
                    <Avatar image={avatar} name={player.user.username} />
                }
                </div>
                <div style={{flex: 2}}>
                <Text h3>{player.user.username}</Text>
                </div>
                { voting && votes > 0?
                    <div style={{flex: 1}}>
                        <div style={styles.marker}>{votes}</div>
                    </div>
                 : null }

            </div>
        )
    }
}


class PlayerList extends Component {
    constructor(props){
        super(props)
        this.handleVote = this.handleVote.bind(this)
    }
    handleVote(player, role_id){
        this.props.setVote({
            voter_id: this.props.user.player.id,
            choice_id: player.id,
            role_id: role_id ? role_id : null,
        })
    }
  render() {
    const players = this.props.aliveOnly && this.props.game != null ? this.props.game.players.filter(function(player){return player.alive}) :this.props.players
    const voting = this.props.voting || false
    const voteType = this.props.voteType
    const role_id = this.props.role ? this.props.role.id : null
    return (
    <ListSelect getIndex={(i) => this.setState({ listValue: i })}>
      {
        players.map((player, i) => (
        <ListSelectItem key={i} >
            <PlayerListItem handleVote={this.handleVote} voting = {voting} player={player} votes={player.votes[voteType]} role_id = {role_id} />
        </ListSelectItem>
      ))
      }
    </ListSelect>

    )
  }
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    marker: {
        backgroundColor: "gray",
        color: "white",
        height: "25px",
        width: "25px",
        borderRadius: "30px",
        textAlign: "center",
        top: "50%",
        paddingTop:"5px",
        paddingLeft: "5px",
        paddingRight: "5px"
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerList)
