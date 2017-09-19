import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'web/components/base/Link'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, Grid, Card, CardContent } from 'bjageman-react-toolkit'
import Login from './users/Login'

class Home extends React.Component {
    render(){
        return(
        <Grid>
            <Card>
                <CardContent>
                <h1>Werewolf</h1>
                <h4>The Party Game</h4>
                </CardContent>
                {this.props.user ?
                    <CardContent>
                        <Link to='/create'>
                            <Button raised>Create Game</Button>
                        </Link>
                        <Link to='/games'>
                            <Button raised>Join Game</Button>
                        </Link>
                    </CardContent>
                :
                    <Login />
                }
            </Card>
        </Grid>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
