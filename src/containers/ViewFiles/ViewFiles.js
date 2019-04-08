import React from 'react';
import {Component} from 'react';
import FileCard from '../../components/FileCard/FileCard';
import {Link} from 'react-router-dom'
import './ViewFiles.css';
import { Table , Menu, Icon, Label, Button} from 'semantic-ui-react';

import { MDBDataTable } from 'mdbreact';
  


class ViewFiles extends Component{

    state={
       files:[
           {codigo: "23123", descripcion: "descripcion del file", biblia:"2018, mayo", agencia:"nts",
           estado:"activo", cantServicios: "2", cantTransportes: "3" },
           {codigo: "231233", descripcion: "descripcion del file", biblia:"2018, mayo", agencia:"nts",
           estado:"activo", cantServicios: "2", cantTransportes: "3" }
       ] 
    }

    data = {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Office',
            field: 'office',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Age',
            field: 'age',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Start date',
            field: 'date',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Salary',
            field: 'salary',
            sort: 'asc',
            width: 100
          }
        ],
        rows: [
          {
            name: 'Tiger Nixon',
            position: 'System Architect',
            office: 'Edinburgh',
            age: '61',
            date: '2011/04/25',
            salary: '$320'
          },
          {
            name: 'Garrett Winters',
            position: 'Accountant',
            office: 'Tokyo',
            age: '63',
            date: '2011/07/25',
            salary: '$170'
          },
          {
            name: 'Ashton Cox',
            position: 'Junior Technical Author',
            office: 'San Francisco',
            age: '66',
            date: '2009/01/12',
            salary: '$86'
          },
          {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433'
          },
          {
            name: 'Airi Satou',
            position: 'Accountant',
            office: 'Tokyo',
            age: '33',
            date: '2008/11/28',
            salary: '$162'
          },
          {
            name: 'Brielle Williamson',
            position: 'Integration Specialist',
            office: 'New York',
            age: '61',
            date: '2012/12/02',
            salary: '$372'
          },
          {
            name: 'Herrod Chandler',
            position: 'Sales Assistant',
            office: 'San Francisco',
            age: '59',
            date: '2012/08/06',
            salary: '$137'
          },
          {
            name: 'Rhona Davidson',
            position: 'Integration Specialist',
            office: 'Tokyo',
            age: '55',
            date: '2010/10/14',
            salary: '$327'
          },
          {
            name: 'Colleen Hurst',
            position: 'Javascript Developer',
            office: 'San Francisco',
            age: '39',
            date: '2009/09/15',
            salary: '$205'
          },
          {
            name: 'Sonya Frost',
            position: 'Software Engineer',
            office: 'Edinburgh',
            age: '23',
            date: '2008/12/13',
            salary: '$103'
          }
        ]
    }
     
    render(){
        return <div>
            <h3>Lista de files</h3>

            <MDBDataTable
                striped
                bordered
                small
                data={this.data}
            />

            <Table celled sortable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Codigo</Table.HeaderCell>
                    <Table.HeaderCell>descripcion</Table.HeaderCell>
                    <Table.HeaderCell>Biblia</Table.HeaderCell>
                    <Table.HeaderCell>Agencia</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Cant. servicios</Table.HeaderCell>
                    <Table.HeaderCell>Cant. transportes</Table.HeaderCell>
                    <Table.HeaderCell>Accion</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.files.map((item,i)=>{
                        return <Table.Row>
                            <Table.Cell>
                                <Label ribbon>{item.codigo}</Label>
                            </Table.Cell>
                            <Table.Cell>{item.descripcion}</Table.Cell>
                            <Table.Cell>{item.biblia}</Table.Cell>
                            <Table.Cell>{item.agencia}</Table.Cell>
                            <Table.Cell>
                                <Label color="green">{item.estado}</Label>
                            </Table.Cell>
                            <Table.Cell>{item.cantServicios}</Table.Cell>
                            <Table.Cell>{item.cantTransportes}</Table.Cell>
                            <Table.Cell>
                                <Button circular icon="eye"></Button>
                                <Button circular color="red" icon="trash"></Button>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>

                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='8'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>

{/*
                <div className="ContenedorFileCards">
                    <FileCard codigo="1902-019" descripcion="Viaje a Panama!" agencia="Nts" ></FileCard>
                    <FileCard codigo="1902-019" descripcion="Viaje a Panama!" agencia="Nts" ></FileCard>
                </div>
*/}
                <hr></hr>
                <Link to="/file/crear">Agregar nuevo file</Link>
            </div>
    }

}
export default ViewFiles;