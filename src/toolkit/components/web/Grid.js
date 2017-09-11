import React from 'react'

class Grid extends React.Component {
  render() {
    return (
        <div style={styles.grid}>
            {this.props.children}
        </div>
    )
  }
}

export class GridItem extends React.Component {
  render() {
    return (
        <div style={styles.item}>
            {this.props.children}
        </div>
    )
  }
}

const styles = {
    grid: {
        display: "flex",
	    flexWrap: "wrap",
        flexDirection: "row",
	    alignItems: "center",
	    justifyContent: "center",
    },
    item: {
        padding: "1%",
        marginBottom: "5px",
    },
    content: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "1em",
	    width: "100%",
    }
}

export default Grid
