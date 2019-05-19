import React from 'react';
import {Component} from 'react';
import FileCard from '../../components/FileCard/FileCard';
import {Link} from 'react-router-dom'
import './ViewFiles.css';
import { Table , Menu, Icon, Label, Button, Container, Header, Input, Segment} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Requester from '../../common/Services/Requester';
import TablaBuscador from '../TablaBuscador/TablaBuscador';

//import { MDBDataTable } from 'mdbreact';
  


class ViewFiles extends Component{
	state={
		//search:'',
		files:[
			//{codigo: "23123", descripcion: "descripcion del file", biblia:"2018, mayo", cliente:"nts", fecha:"2/05/2019", estado:"activo", cantServicios: "2", cantTransportes: "3" },
		] 
	}

  	componentDidMount(){
		Requester.getListadoFiles(rpta=>{
			let listaFiles = rpta.cont.map((e,i)=>{
				return {
					idFile: e.id,
					codigo : e.codigo,
					descripcion : e.descripcion,
					biblia: e.nombreBiblia,
					cliente: e.nombreCliente,
					fecha: e.fechaCreacion.split(" ")[0],
					cantServicios:e.cantServicios,
					cantTransportes:e.cantTransportes	
				}
			});
			this.setState({files:listaFiles});	
		});
	}

	render(){
    	const cols = [
			{	
				Header:'id',
				accessor:'idFile',
				show:false
			},
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
				Header: 'Cliente',
				accessor: 'cliente',
			}, 
			{
				Header: 'Fecha registro',
				accessor: 'fecha',
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
				Cell: props => {
					console.log(props);
					let urlVer = "/file/ver/"+props.row.idFile;
					let urlEditar="/file/editar/"+props.row.idFile;
					return <Container textAlign="center">
					<Link to={urlVer}>
						<Button circular icon="eye"></Button>
					</Link>
					<Link to={urlEditar}>
						<Button circular icon="pencil"></Button>
					</Link>
					<Button circular color="red" icon="trash"></Button>
					</Container>
				}
			}
		]
		
		/*
		let data = this.state.files
	
		if (this.state.search) {
			data = data.filter(row => {
				let e = 1;
				for (var property in row) {
					if (row.hasOwnProperty(property)) {
						let val = row[property];
						if(val)
							if(String(val).toLowerCase().includes(this.state.search.toLowerCase()))
								return true;
					}
				}
				console.log("returning falseeeeeeeeeeeeeeeeeee!!!!!!!!!!");
				return false;
			})
		}
  */

		return(<div>
			
			<Header size="large">Files</Header>
			<Container fluid textAlign>
				<Link to="/files/crear">
					<Button primary>Nuevo file</Button>
				</Link>
			</Container>
			<Header size="medium">Lista de files</Header>

			<Segment>
				<TablaBuscador data={this.state.files} columns={cols} />
			</Segment>
			{/*
			<Segment>
			Buscar registros: <Input style={{padding:"10px 0px"}}
				placeholder="Buscar..."
				value={this.state.search}
				onChange={e => this.setState({search: e.target.value})}/>
			<br/>
			<ReactTable
				data={data}
				columns={cols} 

				rows={10}
				minRows={5}
				className="-highlight"
			/>
			</Segment>
			*/}

		</div>
		)
  	}
}
export default ViewFiles;