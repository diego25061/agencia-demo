import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Menu } from 'semantic-ui-react';
import ReactTable from "react-table";

const cols = [
    {
        Header: 'Nombre',
        accessor: 'nombre' // String-based value accessors!
    },
    {
        Header: 'Correo',
        accessor: 'correo',
    },
    {
        Header: 'Correo Adic.',
        accessor: 'correoAdic',
    }, 
    {
        Header: 'Numero contacto',
        accessor: 'numeroContacto',
    }, 
    {
        Header: 'Numero contacto adicional',
        accessor: 'numeroContactoAdicional',
    },
    {
        Header: 'Ciudad',
        accessor: 'ciudad',
    },
    {
        Header: 'Accion',
        Cell: props => <Container textAlign="center"><Button circular icon="eye"></Button>
        <Button circular color="yellow" icon="pencil"></Button>
        <Button circular color="red" icon="trash"></Button></Container>
    
    }, 
]



class TabTodos extends Component{

    state={
        hoteles:[
            {nombre:"Melia", correo:"asd@asd.com", correoAdic:"asljkdq@as.com", numeroContacto:"(51)65465",
             numeroContactoAdicional:"123312", ciudad:"city"}
        ]
    }

    render(){
        return <Container fluid style={{margin:"10px 0px 0px 0px"}}>
                <Header size="medium">Todos los proveedores</Header> 
                
                <ReactTable
                    data={this.state.hoteles}
                    columns={cols}
                    minRows={1}
                />  
            </Container>
    }
}

export default TabTodos