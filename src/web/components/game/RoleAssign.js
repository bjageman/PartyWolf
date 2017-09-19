import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'web/components/base/Link'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {Card, CardContent, CardMedia, Text, Button} from 'bjageman-react-toolkit'

class RoleAssign extends Component {
  render() {
    const user = this.props.user || null
    const player = user != null && user.player
    const role = player != null && player.role
    return (

        <Card>
        <CardContent>
        <Text h4>You are a...</Text>
        <Text h3>{role.name}</Text>
        <Link to='/game/menu/villagers'><Button raised>Next</Button></Link>
        </CardContent>
        <CardMedia>
        <img
          style={imageStyle}
          alt="role"
          src={role.avatar}
        />
        </CardMedia>
        </Card>


    )
    }
}

const imageStyle = {
  maxHeight: 180,
  width: "100%"
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);
