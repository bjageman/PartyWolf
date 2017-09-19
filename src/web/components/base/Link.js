import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export class Link extends React.Component {
    render(){
        return(
        <RouterLink style={{ color:"inherit", textDecoration: 'none' }} to={this.props.to}>
        {this.props.children}
        </RouterLink>
        )
    }
}
