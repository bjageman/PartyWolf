import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../../../redux/utils'


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
        if (this.props.newUser != null) {
            return(
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }}/>
            )
        }else{
            return(
                <div>
                {this.props.newUser}
                    <form>
                        <input type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                        <input type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                        <input
                            className="btn btn-primary button"
                            type="submit"
                            value="SUBMIT"
                            onClick={this.handleSubmit}
                            />
                    </form>
                    {this.renderDebug()}
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
