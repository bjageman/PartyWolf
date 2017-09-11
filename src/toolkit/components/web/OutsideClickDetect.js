import React from 'react'

class OutsideClickDetect extends React.Component {
    componentDidMount() {

        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.node.contains(e.target)){
            this.props.onOutsideClick()
        }
    }
    render() {
        return (
            <div ref={node => this.node = node}>
                {this.props.children}
            </div>
        );
    }
}

export default OutsideClickDetect
