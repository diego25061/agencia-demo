import React from 'react';
import {Component} from 'react';
import VerServicios from '../VerServicios/VerServicios';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import { Segment, Header, Icon, Card, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

class ListaBiblias extends Component{

    state={
        biblias:[
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
            }
        ]
    }

    render(){
        return <div>
            {this.state.biblias.map(e=>{
                var cuadro = (
                    <Segment>
                        <Header size="large">{e.anho}</Header>
                        <Grid columns="6"> 
                            <Grid.Row>
                                    {e.meses.map((mes,i)=>{
                                        if(i<6)
                                        return <Grid.Column>
                                                <Card>
                                                    <Card.Content header={mes.mes} />
                                                    <Card.Content extra>
                                                    <Icon name='folder' />
                                                    {mes.files}
                                                    </Card.Content>
                                                </Card>
                                        </Grid.Column>
                                    })}
                            </Grid.Row>
                            <Grid.Row>
                                    {e.meses.map((mes,i)=>{
                                        if(i>5)
                                        return <Grid.Column>
                                                <Card>
                                                    <Card.Content header={mes.mes} />
                                                    <Card.Content extra>
                                                    <Icon name='folder' />
                                                    {mes.files}
                                                    </Card.Content>
                                                </Card>
                                        </Grid.Column>
                                    })}
                            </Grid.Row>
                        </Grid>
                    </Segment>
                )
                return cuadro;
            })}
            <hr/>
            <Link>Crear biblia</Link>
            
        </div>
    }
} 

export default ListaBiblias;