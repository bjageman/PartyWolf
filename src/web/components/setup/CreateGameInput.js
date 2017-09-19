import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Link } from 'web/components/base/Link'
import { Button, CardContent } from 'bjageman-react-toolkit'

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
        <div>
            <CardContent>
                <Button raised onClick={this.handleSubmit}>
                    Create
                </Button>
                <Link to="/"><Button>Cancel</Button></Link>
            </CardContent>
        </div>
        )
    }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameInput)
