import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { TextInput, Button, CardContent } from 'bjageman-react-toolkit'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            "username": "",
            "password": "",
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
      console.log("SUBMITTING")
        event.preventDefault()
        this.props.register({
            "username": this.state.username,
            "password": this.state.password,
        })
    }

    renderDebug(){
        return(
            <div>
            {this.props.user ? <p>{this.props.user.username}</p> : null}
            {this.props.error ? <p>{this.props.error}</p> : null}
            </div>
        )
    }

    render(){
        return(
            <CardContent>
            <h2>Register Here</h2>
                    <TextInput
                        name="username"
                        label="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                    <TextInput
                        type="password"
                        name="password"
                        label="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                    <Button raised onClick={this.handleSubmit}>
                        Register
                    </Button>
                    <Link to='/'>
                        <Button>Login</Button>
                    </Link>
                {this.renderDebug()}
            </CardContent>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
