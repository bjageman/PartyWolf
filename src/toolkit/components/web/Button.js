import React from 'react'

class Button extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: false,
            hover: false,
         }
    }
    setStyle(){
        var style = styles.button
        if (this.props.raised){
             style = {...style, ...styles.raised }
        }else if (this.props.float){
            style = {...style, ...styles.float }
        }else{
            style = { ...style, ...styles.flat }
        }
        style =  this.state.active ? { ...style, ...style.active } : style
        style = this.state.hover ? { ...style, ...style.hover } : style
        style = {...style, ...this.props.style}
        return style
    }

    render(){
        const style = this.setStyle()
        return(
        <button
            onClick = {this.props.onClick}
            onMouseDown={() => this.setState({active: true})}
            onMouseUp={() => this.setState({active: false})}
            onMouseOver={() => this.setState({hover: true})}
            onMouseLeave={() => this.setState({active: false, hover: false})}
            style={style}
             >
            { this.props.children }
        </button>
        )
    }
}


const styles = {
    button: {
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        fontFamily: ["roboto", "sansSerif"],
        transition: "all 300ms ease",
    },
    float: {
        zIndex: 6,
        position: "fixed",
        bottom: "30px",
        right: "30px",
        boxShadow: "0px 2px 5px #666",
        borderRadius:"50%",
        height:"56px",
        width:"56px",
        backgroundColor:"rgba(255,87,34 ,1)",
        color: "white",
        textAlign: "center",
        justifyContent: "center",
        active: {
            zIndex: 12,
            boxShadow: "0px 12px 12px rgba(0, 0, 0, .38)",
        }
    },
    flat: {
        margin: "5px",
        padding: 0,
        background: "none",
        color: "#2196F3",
        active: {
            color: "gray",
        },
        hover: {
            color: "gray",
        }
    },
    raised: {
        minWidth: "88px",
        height: "36px",
        borderRadius: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "25px",
        paddingRight: "25px",
        transition: "all 300ms ease",
        backgroundColor: "rgba(3,169,244 ,1)",
        color: "white",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, .38)",
        active: {
            backgroundColor: "#0288D1",
            boxShadow: "0px 2px 2px rgba(0, 0, 0, .38)",
        },
        hover: {
            backgroundColor: "#0288D1",
            color: "white",
        }
    },
}

export default Button
