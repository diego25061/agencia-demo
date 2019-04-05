import React from 'react'
import {Component} from 'react'

class ElementoForm extends Component{
    render(){
        return <p>
                <div><b>{this.props.titulo}</b></div>
                {this.props.children}
            </p>
    }

}

export default ElementoForm;