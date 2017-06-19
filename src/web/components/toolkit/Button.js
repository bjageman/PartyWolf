class Login extends React.Component {
  render(){
    return (
      <input
          type="submit"
          value="SUBMIT"
          onClick={this.props.onClick}
          />
      )
  }
}
