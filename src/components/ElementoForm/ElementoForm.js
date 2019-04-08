import React from 'react'
import {Component} from 'react'
import { Header } from 'semantic-ui-react';

class ElementoForm extends Component{
    render(){
        let e = this.props.titulo;
        if(this.props.black)
            e = <b>{e}</b>;

        return <p>
                <Header size="tiny">{e}</Header>
                {this.props.children}
            </p>
    }

}

export default ElementoForm;