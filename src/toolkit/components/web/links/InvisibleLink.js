import React from 'react'
import { NavLink } from 'react-router-dom'

class InvisibleLink extends React.Component {
    render(){
        return(
        <NavLink style={{ color:"inherit", textDecoration: 'none' }} to={this.props.to}>{this.props.children}</NavLink>
        )
    }
}

export default InvisibleLink
