import React from 'react'

class Container extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                {this.props.children}
            </div>

        )
    }
}

export default Container;
