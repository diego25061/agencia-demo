import React from 'react'
import {Component} from 'react'

class ContainedComponent extends Component{
    
    getParentContainer = () => {
        return { ...this.props.parent.state[this.props.pack] };
    }

    UpdateParentContainer = (cont) => {
        this.props.parent.setState({ [this.props.pack]: cont })
    }
}

export default ContainedComponent;