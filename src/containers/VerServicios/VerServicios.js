import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import { Label, Button, Container, Header, Segment} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import TablaBuscador from '../TablaBuscador/TablaBuscador';

class VerServicios extends Component{

    state={
        serviciosServ:[
            {
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                cantPasajeros: "2", 
                pasajero: "Ctm",
                transportista: "Javi" 
            },
            {
                nombre: "City tour2",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                cantPasajeros: "2", 
                pasajero: "Ctm",
                transportista: "Javi" 
            }
        ] ,
        
        serviciosTransp:[
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
            }
        ] 
     }


    render(){
       
        const cols = [
        {
        Header: 'Nombre',
        accessor: 'nombre' // String-based value accessors!
        },
        {
        Header: 'File',
        accessor: 'file',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
        {
        Header: 'Fecha',
        accessor: 'fecha',
        }, 
        {
        Header: 'Ciudad',
        accessor: 'ciudad',
        }, 
        {
        Header: 'Hora recojo',
        accessor: 'horaRecojo',
        },
        {
        Header: 'Cant. pasajeros',
        accessor: 'cantPasajeros',
        }, 
        {
        Header: 'Pasajero',
        accessor: 'pasajero',
        }, 
        {
        Header: 'Transportista',
        accessor: 'transportista',
        }, 
        {
        Header: 'Accion',
        Cell: props => <Container textAlign="center"><Button circular icon="eye"></Button>
        <Button circular color="yellow" icon="pencil"></Button>
        <Button circular color="red" icon="trash"></Button></Container>
        }, 
    ]
    
        return(<div>
                <Header size="large">Lista de servicios</Header> 
                <Header size="medium">Servicios</Header> 
                <Segment>
                    <ReactTable
                        data={this.state.serviciosServ}
                        columns={cols}
                        minRows={1}
                    />
                </Segment>
                <Header size="medium">Transportes</Header> 
                <Segment>
                    <ReactTable
                        data={this.state.serviciosTransp}
                        columns={cols}
                        minRows={1}
                    />
                </Segment>
                <hr/>
                <Link to="/servicios/crear">Agregar nuevo servicio</Link>
                <TablaBuscador/>
            </div>
        )
    }

 }

export default VerServicios;