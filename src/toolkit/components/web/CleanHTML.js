import React from 'react'

class CleanHTML extends React.Component {

    createMarkup(data) {
        return {__html: data};
    }

    render(){
        return(
            <div dangerouslySetInnerHTML={this.createMarkup(this.props.html)} />
        )
    }
}

export default CleanHTML
