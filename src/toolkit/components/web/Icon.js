import React from 'react'
import MdDelete from 'react-icons/lib/md/delete'
import MdCreate from 'react-icons/lib/md/create'
import MdShare from 'react-icons/lib/md/share'
import MdFavorite from 'react-icons/lib/md/favorite'
import MdPerson from 'react-icons/lib/md/person'
import MdMenu from 'react-icons/lib/md/menu'
import MdClose from 'react-icons/lib/md/close'

class Icon extends React.Component {
    render(){
        const name = this.props.name
        return(
            <div style={styles.icon} >
                {name === "add" ? "+" : null}
                {name === "delete" ? <MdDelete /> : null}
                {name === "create" ? <MdCreate /> : null}
                {name === "share" ? <MdShare /> : null}
                {name === "favorite" ? <MdFavorite /> : null}
                {name === "person" ? <MdPerson /> : null}
                {name === "menu" ? <MdMenu /> : null}
                {name === "close" ? <MdClose /> : null}
            </div>
        )
    }
}


const styles = {
    icon: {
        display: "inline",
        fontSize: "24px",
        fontFamily: 'Roboto',
        fontWeight: 300,
    },
    button: {
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "20px",
        height: "20px",
        background: "red",
    }
}

export default Icon
