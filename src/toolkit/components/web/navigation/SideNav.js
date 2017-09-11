import React from 'react'

class SideNav extends React.Component {
    render(){
        if (this.props.open){
            return (
                <div
                    style={styles.container}
                    onClick = {this.props.onClick}
                    >
                    {this.props.children}
                </div>
            )
        }else{
            return null
        }
    }
}

const styles = {
    container: {
        height: "100%",
        width: "250px",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: "hidden",
        transition: "0.5s",
        backgroundColor: "white",
        boxShadow: "0px 0px 16px rgba(0, 0, 0, .38)",
    }
}

export default SideNav
