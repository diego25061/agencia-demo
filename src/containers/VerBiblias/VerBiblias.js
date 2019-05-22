import React from 'react';
import { Component } from 'react';
import VerServicios from '../VerServicios/VerServicios';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import { Segment, Header, Icon, Card, Grid, Message, Dropdown, Modal, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Requester from '../../common/Services/Requester';
import CONSTANTES_GLOBALES, { CodigoMesATexto } from '../../common/Constantes';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import ModalCrearBiblia from '../../components/ModalCrearBiblia/ModalCrearBiblia';


class ListaBiblias extends Component {

    state = {

        modalBiblia: {
            abierto: false,
            transaccionEnviada: false,
            responseRecibida: false,
            rptaTransaccion: null,

            campos: {
                mes: null,
                anho: null
            }
        },

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


        Requester.getBibliasDetalle((rpta) => {
            var anhos = rpta.cont.map((e) => { return e.anho });
            var anhosUnique = anhos.filter(this.onlyUnique);
            //console.log(anhosUnique);
            var biblias = anhosUnique.map((e, i) => {
                var meses = rpta.cont.filter((biblia) => {
                    return biblia.anho == e;
                });
                meses = meses.map((e) => {
                    return {
                        mes: CodigoMesATexto(e.mes),
                        files: e.cantidadFiles,
                        codigoMes:e.mes
                    }
                })
                meses = meses.sort((a, b) => {
                    return a.mes - b.mes;
                })
                //console.log(meses)
                return { anho: e, meses: meses };
            })
            biblias.sort((a, b) => {
                return b.anho - a.anho;
            })
            console.log(biblias);
            this.setState({ biblias: biblias });
        });
    }
    componentDidMount = () => {
        this.cargarBiblias();
    }

    render = () => {
        return <div>

            <Header size="large">Biblias</Header>
            <Button primary onClick={() => {
                var obj = { ...this.state.modalBiblia };
                obj.abierto = true;
                this.setState({ modalBiblia: obj });
            }}>Nueva Biblia</Button>
            <Header size="small">Lista</Header>
            {this.state.biblias.map(e => {
                var cuadro = (
                    <Segment tertiary>
                        <Header size="large">{e.anho}</Header>
                        <Grid columns="6">
                            <Grid.Row>
                                {e.meses.map((mes, i) => {
                                    if (i < 6)
                                        return <Grid.Column>
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
                                            </Card>
                                        </Grid.Column>
                                })}
                            </Grid.Row>
                            <Grid.Row>
                                {e.meses.map((mes, i) => {
                                    if (i > 5)
                                        return <Grid.Column>
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
                                            </Card>
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
            <ModalCrearBiblia parentComponent={this} />
        </div>
    }

    EnviarPostBiblia = () => {

        var newStateModalBiblia = { ...this.state.modalBiblia };
        newStateModalBiblia.transaccionEnviada = true;
        this.setState({ modalBiblia: newStateModalBiblia });

        Requester.postBiblia(this.state.modalBiblia.campos, (rpta) => {
            var newState = { ...this.state.modalBiblia };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rpta;
            this.cargarBiblias();
            this.setState({ modalBiblia: newState });
        }, (rptaError) => {
            var newState = { ...this.state.modalBiblia };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rptaError;
            //console.log(this.state.modalBiblia);
            this.setState({ modalBiblia: newState });
        });
    }

}




export default ListaBiblias;