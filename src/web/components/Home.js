import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../redux/utils'

import Login from './users/Login'

class Home extends React.Component {
    render(){
        return(
            <div>
                <h1>Werewolf</h1>
                <h4>The Party Game</h4>
                {this.props.user ?
                <div className="form-group" role="group">
                    <Link to='/create'><button type="button" className="btn btn-primary btn-lg btn-block">
                        Create Game
                    </button></Link>
                    <br />
                    <Link to='/games'><button  type="button" className="btn btn-warning btn-lg btn-block">
                        Join Game
                    </button></Link>
                </div>  : <div>
                <Login />
                </div>}
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
