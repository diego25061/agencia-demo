import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import { Label, Button, Container, Header, Segment} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import TablaBuscador from '../TablaBuscador/TablaBuscador';
import ModalCrearServicio from './ModalCrearServicio';
import CONSTANTES_GLOBALES from '../../common/Constantes';
import Requester from '../../common/Services/Requester';

class VerServicios extends Component{

    state={
        modalServicio:{
            abierto:false,
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null,
            tipo:CONSTANTES_GLOBALES.TiposServicios[0].value,

            campos:{
                fecha:"",
                ciudad:"",
                nombre:'',
                file:"",
                hotel:"",
                pasajeros:"",
                nombrePasajero:"",
                alm:"",
                observaciones:"",
                proveedor:"",
                tren:"",
                horaRecojo:"",
                horaSalida:"",
                transporte:"",

            }
        },

        serviciosServ:[
            /*
            {
                idServicio=1,
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima",
                hotel:"melia" ,
                cantPasajeros: "2", 
                pasajero: "Ctm",
            }*/
        ] ,
        
        serviciosTransp:[
            /*
            {
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                horaSalida:"11:40:01", 
                cantPasajeros: "3", 
                pasajero: "Ctm",
                transportista: "Javi" 
            }*/
        ] 
     }


    render(){
       
        
        const cols = [
        {
            Header: 'Nombre', accessor: 'nombre' , Cell: props => props.value ? props.value:"-" 
        },
        {
            Header: 'File', accessor: 'file', Cell: props => props.value ? props.value:"-" 
        },
        {
            Header: 'Fecha', accessor: 'fecha', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Hora recojo', accessor: 'horaRecojo', Cell: props => props.value ? props.value:"-" 
        },
        {
            Header: 'Cant. pasajeros', accessor: 'cantPasajeros', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Pasajero', accessor: 'pasajero', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Transportista', accessor: 'transportista', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Accion',
            Cell: props => <Container textAlign="center">
                <Button circular icon="eye"/>
                {/*<Button circular color="yellow" icon="pencil"></Button>
                <Button circular color="red" icon="trash"></Button>*/}
            </Container>
        }, 
    ]
    
        return(<div>
                <Header size="large">Lista de servicios</Header> 
                {/*
                <Button primary onClick={ ()=>{
                    var obj = {...this.state.modalServicio};
                    obj.abierto=true;
                    this.setState({modalServicio:obj});
                } }>Nuevo Servicio</Button>
            */}

                <Header size="medium">Servicios generales programados</Header> 
                <Segment>
                    
                    <TablaBuscador data={this.state.serviciosServ} columns={cols} />
                </Segment>
                <Header size="medium">Servicios de transporte programados</Header> 
                <Segment>
                    <TablaBuscador data={this.state.serviciosTransp} columns={cols} />
                </Segment>
                {/*<ModalCrearServicio parentComp={this}/>*/}
            </div>
        )
    }

    enviarServicio = () => {
        /*
        Requester.postServicio(
            //this.state.modalServicio.campos.proveedor
        )*/
    }

    componentDidMount= () =>{
/*
       
                idServicio=1,
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima",
                hotel:"melia" ,
                cantPasajeros: "2", 
                pasajero: "Ctm",
                */
               this.cargarServsGenerales();
        this.cargarServsTransportes();
    }

    cargarServsGenerales = () => {
        Requester.getServiciosGeneralesDetalle((rpta)=>{
            var servs = rpta.cont.map((e,i)=>{
                return {
                    idServicio : e.idServicio,
                    nombre : e.nombre,
                    file: e.codigoFile,
                    fecha : e.fecha,
                    ciudad : e.ciudad,
                    hotel : e.hotel,
                    cantPasajeros : e.pasajeros,
                    pasajero : e.nombrePasajero
                };
            });
            this.setState({serviciosServ:servs});
        },(rptaError)=>{
            console.log("error!");
        });
    }

    cargarServsTransportes = () => {
        
        /*

                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                horaSalida:"11:40:01", 
                cantPasajeros: "3", 
                pasajero: "Ctm",
                transportista: "Javi" 
        */
        Requester.getServiciosTransporteDetalle((rpta)=>{
            console.log("rpta! transportes: ",rpta)
            var servs = rpta.cont.map((e,i)=>{
                return {
                    idServicio : e.idServicio,
                    nombre : e.nombre,
                    file: e.codigoFile,
                    fecha : e.fecha,
                    ciudad : e.ciudad,
                    horaRecojo : e.horaRecojo,
                    cantPasajeros : e.pasajeros,
                    pasajero : e.nombrePasajero,
                    transportista : e.transporte
                };
            });
            this.setState({serviciosTransp:servs});
        },(rptaError)=>{
            console.log("error!");
        });
    }
 }

export default VerServicios;