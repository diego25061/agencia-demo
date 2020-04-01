import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom'
import './ViewFiles.css';
import { Button, Container, Header,  Segment, Confirm } from 'semantic-ui-react';
import 'react-table/react-table.css'
import Requester from '../../common/Services/Requester';
import TablaBuscador from '../TablaBuscador/TablaBuscador';

//import { MDBDataTable } from 'mdbreact';
import FileModel from './../../common/Models/Apis/FileModel';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import { const_numeroAMes } from './../../common/Constantes';
import NotificationStateHolder from '../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from '../NotificacionApi/NotificacionApi';


class ViewFiles extends Component {
	state = {
		//search:'',
		open: false,
		idFileABorrar: 0,
		codigoFileABorrar: '',
		filesCargando: false,
		notificacion_leerFiles: new NotificationStateHolder(),
		files: [
			//{codigo: "23123", descripcion: "descripcion del file", biblia:"2018, mayo", cliente:"nts", fecha:"2/05/2019", estado:"activo", cantServicios: "2", cantTransportes: "3" },
		]
	}

	cargarFiles = () => {
		this.setState({ filesCargando: true });
		Requester.getFiles({}, rpta => {
			//console.log("servicios cargados > ", rpta.cont);
			let listaFiles = rpta.cont.map((e, i) => {
				var fm = new FileModel(e);

				if (fm.servicios) {
					fm.cantServicios = fm.servicios.length;
					//fm.cantServiciosTransporte = fm.servicios.filter(w=> w.clase==='transporte').length;
				}
				if (fm.biblia) {
					let mes = const_numeroAMes(fm.mes);
					mes = mes ? mes : " ";
					fm.nombreBiblia = mes + ' ' + fm.anho;
				}
				if (fm.createdAt) {
					fm.fechaFormato = moment(fm.createdAt).format("DD-MM-YYYY, H:mm")
				}

				return fm;
			});

			let n = this.state.notificacion_leerFiles;
			n.setHidden();
			//console.log("servicios transformados > ",listaFiles);
			this.setState({ files: listaFiles, filesCargando: false, notificacion_leerFiles: n });
		}, (rptaError) => {
			let n = this.state.notificacion_leerFiles;
			n.setRecibidoError("Error al cargar files", rptaError.cont.message, rptaError.cont.statusCode);
			n.mostrarNotificacion = true;
			this.setState({ filesCargando: false });
		});
	}

	componentDidMount() {
		this.cargarFiles();
	}

	render = () => {
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
				accessor: 'nombreBiblia',
			},
			{
				Header: 'Cliente',
				accessor: 'cliente.nombre',
			},
			{
				Header: 'Fecha registro',
				accessor: 'fechaFormato',
			},
			{
				Header: 'Cantidad servicios',
				accessor: 'cantServicios',
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
						{/*
						<Link to={urlEditar}>
							<Button circular icon="pencil"></Button>
						</Link>*/}
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

			<Segment>
				<TablaBuscador data={this.state.files} columns={cols} loading={this.state.filesCargando} />
			</Segment>

			<NotificacionApi
				disabled={!this.state.notificacion_leerFiles.mostrarNotificacion}
				loading={this.state.notificacion_leerFiles.enviando}
				color={this.state.notificacion_leerFiles.notif_color}
				content={this.state.notificacion_leerFiles.contenidoRespuesta}
				title={this.state.notificacion_leerFiles.tituloRespuesta}
				icon={this.state.notificacion_leerFiles.notif_icono}>
			</NotificacionApi>
			<Confirm content={"Seguro que deseas eliminar el file '" + this.state.codigoFileABorrar + "' ?"}
				open={this.state.open}
				onCancel={this.closeConfirm}
				onConfirm={() => {
					Requester.borrarFile(this.state.idFileABorrar,
						(rpta) => {
							this.cargarFiles();
							cogoToast.success("File eliminado", { position: "bottom-center" });
						},
						(rptaError) => {
							this.cargarFiles();
							cogoToast.error(<><b>Error</b> al actualizar file : {rptaError.cont.message + " (" + rptaError.cont.statusCode + ")"}</>, { position: "bottom-center" });
						});
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