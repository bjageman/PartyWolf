import React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { AppBar, AppBarItem } from 'bjageman-react-toolkit'
import { Link } from './Link'

import UserMenu from 'web/components/users/UserMenu'
class NavBar extends React.Component {
    render(){
        const brandName = "Werewolf Party"
        return(
            <AppBar>
                <AppBarItem >
                    { brandName }
                </AppBarItem>
                {this.props.user ?
                    <UserMenu />
                    : null }
            </AppBar>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
