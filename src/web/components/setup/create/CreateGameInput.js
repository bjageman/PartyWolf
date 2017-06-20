import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../../../redux/utils';



class CreateGameInput extends Component {
  constructor(props){
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          gameName: "",
          public: true,
      }
  }

  handleSubmit(e){
      e.preventDefault();
      this.props.createGame({
         user_id: this.props.user.id,
         public: this.state.public
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
        <form>
        <div className='form-group'>
            <label>Game Name</label>
            <input
                type='text'
                className='form-control'
                name='gameName'
                onChange={(event) => this.setState({[event.target.name]:event.target.value})}
                value={this.state.gameName}
                />
            <div className="checkbox">
            <label>
              <input
                  type="checkbox"
                  title='Make Private'
                  onClick={() => this.setState({public: !this.state.public})}
                  checked={!this.state.public}
                  /> Private Server
            </label>
            </div>
            <input
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                value="Create"
                backgroundColor="green"
                onClick={this.handleSubmit}
                />
        </div>
        </form>
        )
    }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameInput)
