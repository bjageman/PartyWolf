import React from 'react'

class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
         }
    }
    render(){
        return (
            <div
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })} >
                <li style={styles.dropdown} >
                    <a style={ this.state.hover ? { ...styles.button, ...styles.button.hover} : styles.button }>
                        {this.props.title}
                    </a>
                    { this.state.hover ?
                    <div style={styles.content}>
                        {this.props.children}
                    </div>
                    : null }
                </li>
            </div>
        )
    }
}

export class MenuItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
         }
    }
    render(){
        const style = this.state.hover ? { ...styles.link, ...styles.link.hover} : styles.link
        return(
            <div
                style={this.props.style}
                onClick={this.props.onClick}
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}>
                <a style={style}>
                    {this.props.children}
                </a>
            </div>

        )
    }

}

const styles = {
dropdown: {
    float: "right",
    display: "inlineBlock",
},
button: {
    fontFamily: "roboto",
    cursor: "pointer",
    display: "block",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    hover: {
        backgroundColor: "#555",
        color: "white",
    }
},
content: {
    display: "block",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    right: 0,
},
link: {
    fontFamily: "roboto",
    cursor: "pointer",
    color: "black",
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
    textAlign: "left",
    hover: {
        backgroundColor: "#f1f1f1",
    }
}

}

export default Menu
