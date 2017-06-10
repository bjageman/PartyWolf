import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Text, Button, Card, Grid, Col, Row, Divider } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils'

class PlayerSummary extends Component {
    render() {
        const title = this.props.title || "Player Summary"
        const players = this.props.players || []
        return (
            <Card title={title}>
                <Grid>
                <Row>
                    <Col><Text>Username</Text></Col>
                    <Col><Text>Role</Text></Col>
                    <Col><Text>Turn Died</Text></Col>
                </Row>
                <Divider style={{ backgroundColor: 'blue' }} />
                {players.map((player, i) => (
                    <Row key={i}>
                        <Col><Text>{player.user.username}</Text></Col>
                        <Col><Text>{player.role.name}</Text></Col>
                        <Col><Text> 0 </Text></Col>
                    </Row>
                     )
                  )
                }
                </Grid>
            </Card>
        )
    }
}

class ResultTable extends Component {
  render() {
      const results = this.props.votes_result || null
      const dead_players = this.props.game && this.props.game.players.filter(function(player){return player.alive == false;}) || []
      const living_players = this.props.game && this.props.game.players.filter(function(player){return player.alive == true;}) || []
      return (
          <ScrollView>
              <PlayerSummary
                  title="Death Count"
                  players={dead_players} />
              <PlayerSummary
                  title="Survivors"
                  players={living_players} />
          </ScrollView>
      )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
