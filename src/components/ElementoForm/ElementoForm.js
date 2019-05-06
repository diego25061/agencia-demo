import React from 'react'
import {Component} from 'react'
import { Header, Container,Grid } from 'semantic-ui-react';

class ElementoForm extends Component{
    render(){
        let e = this.props.titulo;
        if(this.props.black)
            e = <b>{e}</b>;

        let obj = 
        <Container fluid>
            <p>{e}</p>
            {this.props.children}
        </Container>
/*
        if(this.props.grid)
            obj = <Grid.Row>
                <Grid.Column>
                    {obj}
                </Grid.Column>
            </Grid.Row>

*/
        return obj;
    }

}

export default ElementoForm;