import React from 'react'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Icon, Menu, MenuItem } from 'bjageman-react-toolkit';

class UserMenu extends React.Component {
    render() {
        const user = this.props.user
        return (
            <Menu title={<div><Icon name="person" />{user.username}</div>}>
                {user.player ?
                    <MenuItem
                        onClick={() => this.props.quitGame({"player_id": user.player.id})}>
                        Quit
                    </MenuItem>
                :
                    <MenuItem onClick={() => this.props.logout()}>
                        Logout
                    </MenuItem>
                }
            </Menu>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
