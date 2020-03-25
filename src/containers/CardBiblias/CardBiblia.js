import React from 'react';
import { Component } from 'react';
import Requester from './../../common/Services/Requester';
import { Card, Icon, Button } from 'semantic-ui-react';

export default class CardBiblia extends Component {

    state = {
        cantFiles: ''
    }

    render = () => {

        return <>
            <Card style={{ minHeight: "110px" }}>
                <Card.Content header={this.props.mes + " - " + this.props.anho} />
                <Card.Content extra style={{ backgroundColor: "#00000000", padding: "5px 7px" }}>
                    <Icon style={{ padding: "3px" }} name='folder' />
                    {' '+this.state.cantFiles+ ' files'}
                    <Button style={{ backgroundColor: "#00000000", padding: "5px" }} icon floated="right"
                        onClick={() => {
                            this.props.funcNavegar("/calendario/" + this.props.anho + "/" + this.props.idMes);
                        }}>
                        <Icon fitted size="large" name="angle right" />
                    </Button>
                </Card.Content>
            </Card>
        </>

    }

    componentDidMount = () => {
        Requester.getFiles({ "biblia.mes": this.props.mes, "biblia.anho": this.props.anho }, (response) => {
            let count ='error';
            try{
            count = response.cont.length;
            }catch{
                console.error("invalid 'response.cont' > ",response);
            }
            this.setState({cantFiles:count});
        })
    }
}