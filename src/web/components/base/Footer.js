import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../../redux/utils'

import Login from './users/Login'
import Container from './toolkit/bootstrap/Container'

class Footer extends React.Component {
    render(){
        return(
            <Container>
                <div className="text-center col-sm-4 col-md-6 col-md-offset-2">
                    <h1>Werewolf</h1>
                    <h4>The Party Game</h4>
                {this.props.user ?
                    <div className="btn-group" role="group">
                        <Link to='/game/create'><button type="button" className="btn btn-default">
                            Create Game
                        </button></Link>
                        <Link to='/games'><button  type="button" className="btn btn-default">
                            Join Game
                        </button></Link>
                    </div>  : <div>
                    <Login />
                    </div>}
                </div>
            </Container>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
