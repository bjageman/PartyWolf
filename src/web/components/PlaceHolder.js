import React from 'react'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../../redux/utils'


class PlaceHolder extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h1>PlaceHolder Page</h1>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceHolder);
