import React from 'react'

import OutsideClickDetect from './OutsideClickDetect'

class Dialog extends React.Component {

    render(){
        if (this.props.open){
        return(
            <div
                id="modalDialog"
                style={styles.backdrop}>
                <OutsideClickDetect onOutsideClick={() => this.props.onRequestClose()} >
                    <div style={styles.dialog} >
                        { this.props.children }
                    </div>
                </OutsideClickDetect>
            </div>
        )
        }else{
            return null
        }
    }
}

var styles = {
  backdrop: {
    width:"100%",
    height: "100%",
    display: "block",
    position: "fixed",
    margin: "auto",
    zIndex: 1,
    left: 0,
    top: 0,
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
},
  dialog: {
    zIndex: 24,
    minWidth: "300px",
    borderRadius: "3px",
    backgroundColor: "rgba(245,245,245 ,1)",
    padding: "2% 2% 2% 5%",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 24px 24px rgba(0, 0, 0, .38)",
  }
}

export default Dialog
