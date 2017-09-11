import React from 'react'

import OutsideClickDetect from './OutsideClickDetect'

class Drawer extends React.Component {
    render(){
        if (this.props.open){
            return (
                <div style={styles.backdrop}>
                <OutsideClickDetect onOutsideClick={() => this.props.onRequestClose() } >
                <div
                    style={styles.container}
                    onClick = {this.props.onClick}
                    >
                    {this.props.children}
                </div>
                </OutsideClickDetect>
                </div>
            )
        }else{
            return null
        }
    }
}

const styles = {
    backdrop: {
      width:"100%",
      height: "100%",
      display: "block",
      position: "fixed",
      margin: "auto",
      left: 0,
      top: 0,
      overflow: "auto",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    container: {
        position: "fixed",
        height: "100%",
        width: "250px",
        zIndex: 16,
        top: 0,
        left: 0,
        overflowX: "hidden",
        transition: "0.5s",
        backgroundColor: "white",
        boxShadow: "0px 0px 16px rgba(0, 0, 0, .38)",
    }
}

export default Drawer
