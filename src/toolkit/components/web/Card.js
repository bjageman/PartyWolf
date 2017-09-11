import React from 'react'

class Card extends React.Component {
    state = { hover: false }

    setStyle(){
        var props = this.props
        var style = styles.card
        if (props.hoverFloat && this.state.hover ) { style = {...style, ...styles.card.hover}  }
        if (props.width) { style.width = props.width }
        style = {...style, ...this.props.style}
        return style
    }

    render(){
        const cardStyle = this.setStyle()
        return(
            <div
                key={this.props.key}
                style={ cardStyle }
                onMouseOver={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})} >
                {this.props.children}
            </div>
            )
    }
}

export class CardMedia extends React.Component {
    render(){
    return(
        <div style={styles.media}>
            {this.props.children}
        </div>
        )
    }
}

export class CardContent extends React.Component {
    render(){
    return(
        <div style={styles.content}>
            {this.props.children}
        </div>
        )
    }
}

const styles = {
    card : {
        // boxShadow: "0px 2px 0px rgba(0, 0, 0, .38)",
        // margin: "1%",
        // marginTop: "10px",
        transition: "all 300ms ease",
        maxWidth:"100%",
        hover: {
            boxShadow: "0px 8px 8px rgba(0, 0, 0, .38)",
        }
    },
    content:{
        fontFamily: "roboto",
        padding: "2%"
    },
    media: {
        width: "100%",
    }
}

export default Card
