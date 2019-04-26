import React from 'react'
import {Component} from 'react'
import { Button, Container, Header } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalTest from '../ModalTest';


class TabTodos extends Component{

    state = {
        proveedores:[
        ]
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correo' },
        { Header: 'Correo Adic.',accessor: 'correoAdic' }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto' }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
        { Header: 'Tipo', accesor: 'tipo'  },
        { Header: 'Accion', Cell: props => 
            <Container textAlign="center">
                <Button circular icon="eye"></Button>
                <Button circular color="yellow" icon="pencil"></Button>
                <Button circular color="red" icon="trash"></Button>
            </Container>
        }  
    ]

    render = () => {
        return <div>
            <Header size="medium">Todos los proveedores</Header> 
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.proveedores} columns={this.columnasTabla} />
        </div>
    }

    cargarTodos = () =>{
        Requester.getProveedores( "" , (rpta)=>{
            var proovs=rpta.cont.map((e,i)=>{
                var h = {
                    idProveedor:e.idProveedor,
                    nombre:e.nombre,
                    correo:e.correo?e.correo:"-",
                    correoAdic:e.correoAdicional?e.correoAdicional:"-",
                    numeroContacto:e.numeroContacto?e.numeroContacto:"-",
                    numeroContactoAdicional:e.numeroCntctAdicional?e.numeroCntctAdicional:"-",
                    ciudad:e.ciudad?e.ciudad:"-",
                    tipo: "a"// Constantes.aliasATextoProovedores(e.tipoProveedor)
                }
                return h;
            });
            this.setState({proveedores:proovs});
        });
    }

    componentDidMount = () => {
        this.cargarTodos();
    }
    
}

export default TabTodos