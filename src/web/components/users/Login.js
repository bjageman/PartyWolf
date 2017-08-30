import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
        this.props.login({
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
            <div>
                <form>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <input
                            className="btn btn-success btn-lg btn-block"
                            type="submit"
                            value="Login"
                            onClick={this.handleSubmit}
                            />
                        <br />
                        <Link to='/register'><button type="button" className="btn btn-danger btn-lg btn-block">
                            Register
                        </button></Link>
                    </div>

                </form>
                {this.renderDebug()}
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
