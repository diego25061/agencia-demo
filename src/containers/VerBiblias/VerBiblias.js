import React from 'react';
import { Component } from 'react';
import VerServicios from '../VerServicios/VerServicios';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import { Segment, Header, Icon, Card, Grid, Message, Dropdown, Modal, Button, Input, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Requester from '../../common/Services/Requester';
import CONSTANTES_GLOBALES, { CodigoMesATexto, MesANumero } from '../../common/Constantes';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import ModalCrearBiblia from '../../components/ModalCrearBiblia/ModalCrearBiblia';
import BibliaModel from './../../common/Models/Apis/BibliaModel';
import CardBiblia from '../CardBiblias/CardBiblia';
import NotificationStateHolder from '../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from './../NotificacionApi/NotificacionApi';
import { ListaMeses } from './../../common/Constantes';


class ListaBiblias extends Component {

    state = {

        bibliaCargando:false,
        modalBiblia: {
            abierto: false,

            campos: {
                mes: null,
                anho: null
            }
        },

        notificacion_crearBiblia : new NotificationStateHolder(),
        notificacion_leerBiblia : new NotificationStateHolder(),

        biblias: [
            /*
            {
                anho:"2018",
                meses:[
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Marzo" , files:4},
                    {mes:"Mayo" , files:2}
                ]
            },
            {
                anho:"2019",
                meses:[
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Junio" , files:4},
                    {mes:"Marzo" , files:4},
                    {mes:"Mayo" , files:2}
                ]
            }*/
        ]
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    navegar = (direccion) => {
        this.props.history.push(direccion);
    }

    cargarBiblias = () => {

        this.setState({ bibliaCargando:true});
        
        Requester.getFiles({},(rpta) => {
            console.log("rpta > ",rpta.cont);
            let bibs = [];
            for(let i=0;i<rpta.cont.length;i++){
                let e = rpta.cont[i];
                if(e){
                    if(e.anho && e.mes){
                        let mes = ListaMeses.find(x=>x.value===e.mes)
                        if(mes)
                            bibs.push({
                                anho : e.anho,
                                mes:  mes.text
                            });
                    }
                }
            }
            var anhos = bibs.map((e) => { return e.anho });
            var anhosUnique = anhos.filter(this.onlyUnique);
            bibs = bibs.map(x=>x.mes+","+x.anho).filter(this.onlyUnique);
            bibs = bibs.map(x=>{return {mes: x.split(",")[0],anho:x.split(",")[1]}});
            //console.log(anhosUnique);
            var biblias = anhosUnique.map((e, i) => {
                var meses = bibs.filter((biblia) => {
                    return biblia.anho == e;
                });
                meses = meses.map((e) => {
                    return new BibliaModel(e);
                })
                meses = meses.sort((a, b) => {
                    return MesANumero(a.mes) - MesANumero(b.mes);
                })
                //console.log(meses)
                return { anho: e, meses: meses };
            })
            biblias.sort((a, b) => {
                return b.anho - a.anho;
            })
            console.log(biblias);
            let notif = this.state.notificacion_leerBiblia;
            notif.setHidden();
            this.setState({ biblias: biblias,notificacion_leerBiblia:notif , bibliaCargando:false});
        },(rptaError) =>{
            let notif = this.state.notificacion_leerBiblia;
            notif.setRecibidoError("Error al leer biblias",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion=true;
            this.setState({notificacion_leerBiblia:notif, bibliaCargando:false});   
        });
        /*
        Requester.getBiblias({},(rpta) => {
            var anhos = rpta.cont.map((e) => { return e.anho });
            var anhosUnique = anhos.filter(this.onlyUnique);
            //console.log(anhosUnique);
            var biblias = anhosUnique.map((e, i) => {
                var meses = rpta.cont.filter((biblia) => {
                    return biblia.anho == e;
                });
                meses = meses.map((e) => {
                    return new BibliaModel(e);
                })
                meses = meses.sort((a, b) => {
                    return MesANumero(a.mes) - MesANumero(b.mes);
                })
                //console.log(meses)
                return { anho: e, meses: meses };
            })
            biblias.sort((a, b) => {
                return b.anho - a.anho;
            })
            console.log(biblias);
            let notif = this.state.notificacion_leerBiblia;
            notif.setHidden();
            this.setState({ biblias: biblias,notificacion_leerBiblia:notif });
        },(rptaError) =>{
            let notif = this.state.notificacion_leerBiblia;
            notif.setRecibidoError("Error al leer biblias",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion=true;
            this.setState({notificacion_leerBiblia:notif});   
        });*/
    }

    componentDidMount = () => {
        this.cargarBiblias();
    }

    render = () => {
        return <div>

            <Header size="large">Biblias</Header>
            {/*
            <Button primary onClick={() => {
                var obj = { ...this.state.modalBiblia };
                obj.abierto = true;
                this.setState({ modalBiblia: obj });
            }}>Nueva Biblia</Button>*/}
            <Header size="small">Lista</Header>
            {this.state.bibliaCargando ? <Segment basic style={{padding:"200px"}}>
                <Dimmer active inverted><Loader size='huge'>Cargando</Loader></Dimmer>
            </Segment> : <></>}
            {this.state.biblias.map(e => {
                var cuadro = (
                    <Segment tertiary>
                        <Header size="large">{e.anho}</Header>
                        <Grid columns="6">
                            <Grid.Row>
                                {e.meses.map((mes, i) => {
                                    if (i < 6)
                                        return <Grid.Column>
                                            <CardBiblia mes={mes.mes} anho={e.anho} funcNavegar={this.navegar}/>
                                            
                                            {/*
                                            <Card>
                                                <Card.Content header={mes.mes} />
                                                <Card.Content extra style={{ backgroundColor: "#00000000", padding: "5px 7px" }}>
                                                    <Icon style={{  padding: "3px" }} name='folder' />
                                                    {mes.files}
                                                    <Button style={{ backgroundColor: "#00000000", padding: "5px" }} icon floated="right"
                                                        onClick={() => {
                                                            //console.log("state: ",this.props.location.pathname)
                                                            this.navegar("/calendario/"+e.anho+"/"+mes.codigoMes);
                                                        }}>
                                                        <Icon fitted size="large" name="angle right" />
                                                    </Button>
                                                </Card.Content>
                                            </Card>*/}
                                        </Grid.Column>
                                })}
                            </Grid.Row>
                            <Grid.Row>
                                {e.meses.map((mes, i) => {
                                    if (i > 5)
                                        return <Grid.Column>
                                            <CardBiblia mes={mes.mes} anho={e.anho} funcNavegar={this.navegar}/>
                                            {/*
                                            <Card>
                                                <Card.Content header={mes.mes} />
                                                <Card.Content extra style={{ backgroundColor: "#00000000", padding: "5px 7px" }}>
                                                    <Icon name='folder' />
                                                    {mes.files}
                                                    <Button style={{ backgroundColor: "#00000000", padding: "5px" }} icon floated="right"
                                                        onClick={() => {
                                                            this.navegar("/calendario/"+e.anho+"/"+mes.codigoMes);
                                                        }}>
                                                        <Icon fitted size="large" name="angle right" />
                                                    </Button>
                                                </Card.Content>
                                            </Card>*/}
                                        </Grid.Column>
                                })}
                            </Grid.Row>
                        </Grid>
                    </Segment>
                )
                return cuadro;
            })}{/*
                
            <hr/>
            <Link onClick={()=>{
                var obj = {...this.state.modalBiblia};
                obj.abierto=true;
                this.setState({modalBiblia:obj});
                }}>
                Crear biblia</Link>
                */
            }
            
            <NotificacionApi
                disabled={!this.state.notificacion_leerBiblia.mostrarNotificacion}
                loading={this.state.notificacion_leerBiblia.enviando}
                color={this.state.notificacion_leerBiblia.notif_color}
                content={this.state.notificacion_leerBiblia.contenidoRespuesta} 
                title={this.state.notificacion_leerBiblia.tituloRespuesta}
                icon={this.state.notificacion_leerBiblia.notif_icono}>
            </NotificacionApi>

            <ModalCrearBiblia parentComponent={this} 
                crearBiblia_mostrarNotificacion = {this.state.notificacion_crearBiblia.mostrarNotificacion}
                crearBiblia_enviando = {this.state.notificacion_crearBiblia.enviando}
                crearBiblia_notif_color = {this.state.notificacion_crearBiblia.notif_color}
                crearBiblia_contenidoRespuesta = {this.state.notificacion_crearBiblia.contenidoRespuesta}
                crearBiblia_tituloRespuesta = {this.state.notificacion_crearBiblia.tituloRespuesta}
                crearBiblia_notif_icono = {this.state.notificacion_crearBiblia.notif_icono} 
            />
        </div>
    }

    EnviarPostBiblia = () => {
        let obj = this.state.notificacion_crearBiblia;
        obj.setAsEnviando();

        this.setState({notificacion_crearBiblia:obj });

        Requester.crearBiblia(BibliaModel.toApiObj(this.state.modalBiblia.campos), (rpta) => {
            
            let notif = this.state.notificacion_crearBiblia;
            notif.setRecibidoSuccess("Biblia creada","Biblia: "+rpta.cont.anho+" "+rpta.cont.mes)
            this.setState({notificacion_crearBiblia:notif});
            
            this.cargarBiblias();
        }, (rptaError) => {
            let notif = this.state.notificacion_crearBiblia;
            notif.setRecibidoError("Error al crear biblia",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            this.setState({notificacion_crearBiblia:notif});
        });
    }

}




export default ListaBiblias;