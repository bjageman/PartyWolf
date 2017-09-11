import React from 'react'

class AppBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: false,
            hover: false,
         }
    }
    render(){
        return (
            <ul style={styles.list}>
                {this.props.children}
            </ul>
        )
    }
}

export class AppBarButton extends React.Component {
    constructor(props){
        super(props)
        this.state = { hover: false }
    }
    render() {
        var style = styles.listItem
        style = this.props.right ? {...style, ...styles.right }: {...style, ...styles.left }
        style = this.state.hover ? {...style, ...styles.listItem.hover} : style
        return(
            <div style={this.props.style}>
                <li
                    style={style}
                    onClick={this.props.onClick}
                    onMouseOver={() => this.setState({ hover: true })}
                    onMouseLeave={() => this.setState({ hover: false })}
                    >
                    {this.props.children}
                </li>
            </div>

        )
    }
}

export class AppBarItem extends React.Component {
    constructor(props){
        super(props)
        this.state = { hover: false }
    }
    render() {
        var style = styles.listItem
        const position = this.props.right ? {...style, ...styles.right }: {...style, ...styles.left }
        return(
            <div style={this.props.style}>
                <li style={position} >
                    {this.props.children}
                </li>
            </div>

        )
    }
}

const styles = {
    list: {
        listStyleType: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#333",
    },
    left: {
        float: "left",
    },
    right: {
        float: "right",
    },
    listItem: {
        fontFamily: "roboto",
        display: "block",
        color: "white",
        textAlign: "center",
        padding: "14px 16px",
        hover: {
            cursor: "pointer",
            backgroundColor: "#555",
            color: "white",
        }
    },

}

export default AppBar
