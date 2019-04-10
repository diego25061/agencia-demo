import React from 'react';
import {Component} from 'react';
import FileCard from '../../components/FileCard/FileCard';
import {Link} from 'react-router-dom'
import './ViewFiles.css';
import { Table , Menu, Icon, Label, Button} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

//import { MDBDataTable } from 'mdbreact';
  


class ViewFiles extends Component{

    state={
       files:[
           {codigo: "23123", descripcion: "descripcion del file", biblia:"2018, mayo", agencia:"nts",
           estado:"activo", cantServicios: "2", cantTransportes: "3" },
           {codigo: "231233", descripcion: "descripcion del file", biblia:"2018, mayo", agencia:"nts",
           estado:"activo", cantServicios: "2", cantTransportes: "3" }
       ] 
    }


    render(){
      const data = [
        {
          name: 'Tanner Linsley',
          age: 26,
          friend: {
            name: 'Jason Maurer',
            age: 23,
          }},
          {
          name: 'Tanwner Linsley',
          age: 22,
          friend: {
            name: 'Jason Maurer',
            age: 23,
          }},
          {
          name: 'Tanner Linsley',
          age: 26,
          friend: {
            name: 'Jason Maurer',
            age: 23,
          }},
          {
          name: 'Tanner Linsley',
          age: 26,
          friend: {
            name: 'Jason Maurer',
            age: 23,
          }},
      ]
     
      const columns = [{
          Header: 'Name',
          accessor: 'name' // String-based value accessors!
        }, {
          Header: 'Age',
          accessor: 'age',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          id: 'friendName', // Required because our accessor is not a string
          Header: 'Friend Name',
          accessor: d => d.friend.name // Custom value accessors!
        }, {
          Header: props => <span>Friend Age</span>, // Custom header components!
          accessor: 'friend.age'
      }]
     

      
      const cols2 = [
        {
          Header: 'Codigo',
          accessor: 'codigo' // String-based value accessors!
        },
        {
          Header: 'Descripcion',
          accessor: 'descripcion',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
        {
          Header: 'Biblia',
          accessor: 'biblia',
        }, 
        {
          Header: 'Agencia',
          accessor: 'agencia',
        }, 
        {
          Header: 'Estado',
          Cell: props => <Label color="green">Activo</Label> 
        },
        {
          Header: 'Cant. servicios',
          accessor: 'cantServicios',
        }, 
        {
          Header: 'Cant. Transportes',
          accessor: 'cantTransportes',
        }, 
        {
          Header: 'Accion',
          Cell: props => <div><Button circular icon="eye"></Button>
          <Button circular color="red" icon="trash"></Button></div>
        }, 
      ]
   
        return <div>
            <h3>Lista de files</h3>
            
            {/*
            <ReactTable
              data={data}
              columns={columns}
              minRows={1}
            />*/}
            <ReactTable
              data={this.state.files}
              columns={cols2}
              minRows={1}
            />
            
            {/*
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
*/}
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