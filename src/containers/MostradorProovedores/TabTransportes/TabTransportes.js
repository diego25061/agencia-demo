import React from 'react'
import {Component} from 'react'
import { Button, Container, Header } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalTest from '../ModalTest';


class TabTransportes extends Component{

    state = {
        transportes:[
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
            <Header size="medium">Transportes</Header> 
            <Button primary onClick={ this.abrirModal }>Nuevo Transporte</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.transportes} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}
            <ModalTest parent={this} titulo="Crear Transportes" 
                placeholderNombre="Javier" 
                placeholderCorreo="javier.asd@gmail.com" 
                placeholderCorreoAdic="javier.asdasd@hotmail.com"
                enEnviar={this.enviarTransporte}/>
        </div>
    }

    abrirModal = () =>{
        var obj = {...this.state.modalCrear};
        obj.abierto = true;
        this.setState({modalCrear:obj});
    }

    enviarTransporte = () => { 
        
        var obj = {...this.state.modalCrear};
        obj.mensaje.enviado=true;
        this.setState({modalCrear:obj});

        Requester.postProvTransporte( 
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
                this.cargarTransportes();
            },
            (rptaError)=>{
                var obj = {...this.state.modalCrear};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrear:obj});
            }    
        );
    }

    cargarTransportes= () =>{
        Requester.getProveedores(Constantes.AliasProovedores.TRANSPORTE, (rpta)=>{
            var transps=rpta.cont.map((e,i)=>{
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
            this.setState({transportes:transps});
        });
    }

    componentDidMount = () => {
        this.cargarTransportes();
    }
    
}

export default TabTransportes