import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'


class NavBar extends React.Component {
    render(){
        const brandName = "Werewolf Party"
        return(
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">{brandName}</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    {this.props.user && this.props.user.player == null ? <li onClick={() => this.props.logout()}><a href="#">Logout</a></li> : null}
                    {this.props.user && this.props.user.player ? <li onClick={() => this.props.quitGame({"player_id": this.props.user.player.id})}><a href="#">Quit</a></li> : null}
                  </ul>
                </div>
            </div>
            </nav>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
