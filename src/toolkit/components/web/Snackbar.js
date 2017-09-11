import React from 'react'

import OutsideClickDetect from './OutsideClickDetect'

class Snackbar extends React.Component {
  render() {

    if (this.props.open){
        return (
        <div style={styles.backdrop}>
            <OutsideClickDetect onOutsideClick={() => this.props.onRequestClose()} >
                <div style={styles.container}>{this.props.children}</div>
            </OutsideClickDetect>
        </div>
        );
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
      zIndex: 1,
      left: 0,
      top: 0,
      overflow: "auto",
    },
    container: {
        minWidth: "250px", marginLeft: "-125px", backgroundColor: "#333",
        color: "#fff", textAlign: "center", borderRadius: "2px",
        padding: "16px", position: "fixed", zIndex: 1,
        left: "75%", bottom: "30px", fontSize: "17px",
        boxShadow: "0px 24px 24px rgba(0, 0, 0, .38)",
    }
}

export default Snackbar
