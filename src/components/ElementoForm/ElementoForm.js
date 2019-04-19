import React from 'react'
import {Component} from 'react'
import { Header, Container } from 'semantic-ui-react';

class ElementoForm extends Component{
    render(){
        let e = this.props.titulo;
        if(this.props.black)
            e = <b>{e}</b>;

        return <Container fluid>
                <Header size="tiny">{e}</Header>
                {this.props.children}
            </Container>
    }

}

export default ElementoForm;