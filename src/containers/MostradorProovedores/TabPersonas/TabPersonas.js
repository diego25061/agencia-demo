import React from 'react'
import {Component} from 'react'
import { Button, Container, Header } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalTest from '../ModalTest';


class TabPersonas extends Component{

    state = {
        personas:[
        ],
        modalCrear:{
            abierto:false,
            mensaje:{
                enviado:false,
                recibido:false,
                respuesta:null
            },

            campos:{
                nombre:null,
                correo:null,
                correoAdic:null,
                num:null,
                numAdic:null,
                ciudad:null
            }
            
        }
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correo' },
        { Header: 'Correo Adic.',accessor: 'correoAdic' }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto' }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
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
            <Header size="medium">Personas</Header> 
            <Button primary onClick={ this.abrirModal }>Nueva Persona</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.personas} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}
            <ModalTest parent={this} titulo="Crear Persona" 
                placeholderNombre="Christian cueva" 
                placeholderCorreo="cuevita@gmail.com" 
                placeholderCorreoAdic="cuevita.1@hotmail.com"
                enEnviar={this.enviarEmpresa}/>
        </div>
    }

    abrirModal = () =>{
        var obj = {...this.state.modalCrear};
        obj.abierto = true;
        this.setState({modalCrear:obj});
    }

    enviarEmpresa = () => { 
        
        var obj = {...this.state.modalCrear};
        obj.mensaje.enviado=true;
        this.setState({modalCrear:obj});

        Requester.postProvPersona( 
            this.state.modalCrear.campos.nombre,
            this.state.modalCrear.campos.correo,
            this.state.modalCrear.campos.num,
            this.state.modalCrear.campos.numAdic,
            this.state.modalCrear.campos.correoAdic,
            this.state.modalCrear.campos.ciudad,
            (rpta)=>{
                var obj = {...this.state.modalCrear};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rpta;
                this.setState({modalCrear:obj});
                this.cargarPersonas();
            },
            (rptaError)=>{
                var obj = {...this.state.modalCrear};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrear:obj});
            }    
        );
    }

    cargarPersonas = () =>{
        Requester.getProveedores(Constantes.AliasProovedores.PERSONA, (rpta)=>{
            var personas=rpta.cont.map((e,i)=>{
                var h = {
                    idProveedor:e.idProveedor,
                    nombre:e.nombre,
                    correo:e.correo?e.correo:"-",
                    correoAdic:e.correoAdicional?e.correoAdicional:"-",
                    numeroContacto:e.numeroContacto?e.numeroContacto:"-",
                    numeroContactoAdicional:e.numeroCntctAdicional?e.numeroCntctAdicional:"-",
                    ciudad:e.ciudad?e.ciudad:"-"
                }
                return h;
            });
            this.setState({personas:personas});
        });
    }

    componentDidMount = () => {
        this.cargarPersonas();
    }
    
}

export default TabPersonas