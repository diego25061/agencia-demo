import React from 'react';
import {  Icon,  Message, Dropdown, Modal, Button, Input, Grid} from 'semantic-ui-react';
import ElementoForm from '../ElementoForm/ElementoForm';
import CONSTANTES_GLOBALES from '../../common/Constantes';
import MensajeTransaccion from '../MensajeTransaccion/MensajeTransaccion';

/**
 * 
 * @param {*} props Requiere un state parent con la siguiente estructura.
 * ```jsx
 * 
    state = { ...
        modalBiblia:{
            abierto:false,
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null,
            campos:{
                mes:null,
                anho:null
            }
        }
        ...
    } ```

 */
const ModalCrearBiblia = (props) => {
           
    //console.log("props:",props);
    return (
    <Modal size="tiny" open ={props.parentComponent.state.modalBiblia.abierto} centered={true} onClose={() => {var obj = {...props.parentComponent.state.modalBiblia};
        obj.abierto=false;
        props.parentComponent.setState({modalBiblia:obj});}}>
        <Modal.Header>Nueva biblia</Modal.Header>
        <Modal.Content>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <ElementoForm titulo="Mes">
                            <Dropdown placeholder="Junio" fluid search selection options={CONSTANTES_GLOBALES.ListaMeses} 
                                onChange = {(event,data)=>{
                                    var newState = {...props.parentComponent.state};
                                    newState.modalBiblia.campos.mes= data.value;
                                    props.parentComponent.setState(newState);
                                    }}/>
                        </ElementoForm>    
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <ElementoForm titulo="Año">
                            <Input fluid placeholder="Año" onChange={(event)=>{
                                    var newState = {...props.parentComponent.state};
                                    newState.modalBiblia.campos.anho=event.target.value;
                                    props.parentComponent.setState(newState);
                                }}></Input>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <MensajeTransaccion 
                transaccionEnviada = {props.parentComponent.state.modalBiblia.transaccionEnviada} 
                responseRecibida = {props.parentComponent.state.modalBiblia.responseRecibida}
                rptaTransaccion = {props.parentComponent.state.modalBiblia.rptaTransaccion}
                textoExito = "Puede usar la nueva biblia"
            />
            {/*msj*/}
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={() => {var obj = {...props.parentComponent.state.modalBiblia};
                obj.abierto=false;
                props.parentComponent.setState({modalBiblia:obj});}}>
                Cancelar
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={props.parentComponent.EnviarPostBiblia} />
        </Modal.Actions>
    </Modal>)    
}

export default ModalCrearBiblia;