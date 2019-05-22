import React from 'react';
import { Component } from 'react';
import FileCard from '../../components/FileCard/FileCard';
import { Link } from 'react-router-dom'
import './ViewFiles.css';
import { Table, Menu, Icon, Label, Button, Container, Header, Input, Segment, Confirm } from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Requester from '../../common/Services/Requester';
import TablaBuscador from '../TablaBuscador/TablaBuscador';

//import { MDBDataTable } from 'mdbreact';



class ViewFiles extends Component {
	state = {
		//search:'',
		open: false,
		idFileABorrar: 0,
		codigoFileABorrar: '',
		files: [
			//{codigo: "23123", descripcion: "descripcion del file", biblia:"2018, mayo", cliente:"nts", fecha:"2/05/2019", estado:"activo", cantServicios: "2", cantTransportes: "3" },
		]
	}

	cargarFiles = () => {
		Requester.getListadoFiles(rpta => {
			let listaFiles = rpta.cont.map((e, i) => {
				return {
					idFile: e.id,
					codigo: e.codigo,
					descripcion: e.descripcion,
					biblia: e.nombreBiblia,
					cliente: e.nombreCliente,
					fecha: e.fechaCreacion.split(" ")[0],
					cantServicios: e.cantServicios,
					cantTransportes: e.cantTransportes
				}
			});
			this.setState({ files: listaFiles });
		});
	}
	componentDidMount() {
		this.cargarFiles();
	}

	render=()=> {
		const cols = [
			{
				Header: 'id',
				accessor: 'idFile',
				show: false
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
					//console.log(props);
					let urlVer = "/file/ver/" + props.row.idFile;
					let urlEditar = "/file/editar/" + props.row.idFile;
					return <Container textAlign="center">
						<Link to={urlVer}>
							<Button circular icon="eye"></Button>
						</Link>
						<Link to={urlEditar}>
							<Button circular icon="pencil"></Button>
						</Link>
						<Button circular color="red" icon="trash" onClick={() => { console.log("propss", props); this.openConfirm(props.row.idFile, props.row.codigo) }}>
						</Button>
					</Container>
				}
			}
		]

		return (<div>

			<Header size="large">Files</Header>
			<Container fluid textAlign="left">
				<Link to="/files/crear">
					<Button primary>Nuevo file</Button>
				</Link>
			</Container>
			<Header size="medium">Lista de files</Header>

			<Segment>
				<TablaBuscador data={this.state.files} columns={cols} />
			</Segment>

			<Confirm content={"Seguro que deseas eliminar el file '" + this.state.codigoFileABorrar + "' ?"}
				open={this.state.open}
				onCancel={this.closeConfirm}
				onConfirm={() => {
					Requester.postBorrarFile(this.state.idFileABorrar,
						(rpta)=>{this.cargarFiles();},
						(rptaError)=>{this.cargarFiles();});
					this.closeConfirm();
				}} />

		</div>
		)
	}


	openConfirm = (idFile, codFile) => this.setState({ open: true, idFileABorrar: idFile, codigoFileABorrar: codFile })
	closeConfirm = () => {
		this.setState({ open: false, idFileABorrar: 0, codigoFile: '' });
	}
}
export default ViewFiles;