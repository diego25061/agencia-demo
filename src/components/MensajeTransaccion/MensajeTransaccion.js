import React from 'react';
import { Message, Icon} from 'semantic-ui-react';

/**
 * 
 * @param {*} props 
 */

const MensajeTransaccion = ( props ) => {

    let msj = <div></div>
    
    console.log(props)

    //let contenedor = props.contenedor;
    /*
    transaccionEnviada:false,
    responseRecibida:false,
    rptaTransaccion:null,*/
    if(props){
        if (props.transaccionEnviada && !props.responseRecibida){
            msj = <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>{props.headerCargando ? props.headerCargando : "Espere un momento..."}</Message.Header>
                    {props.textoCargando ? props.textoCargando : "Enviando petición"}
                </Message.Content>
            </Message>
        }else
        if (props.responseRecibida){
            //console.log(props.parentComponent.state.modalBiblia)
            if(props.rptaTransaccion.transaccionExitosa()){
                msj = <Message success >
                    <Message.Header>{props.headerExito ? props.headerExito : "Transaccion exitosa"}</Message.Header>
                    <Message.List>
                        {props.textoExito/*<Message.Item>Puede usar la biblia nueva.</Message.Item>*/}
                        {props.rptaTransaccion.msj?<Message.Item>{props.rptaTransaccion.msj}</Message.Item>:null}
                    </Message.List>
                </Message>
            }else {
                msj = <Message negative>
                    <Message.Header>{props.headerError?props.headerError:"Error en transaccion"}</Message.Header>
                    <Message.List>
                        {props.rptaTransaccion.msj?<Message.Item>{props.rptaTransaccion.msj}</Message.Item>:null}
                        {props.rptaTransaccion.trace?<Message.Item>{props.rptaTransaccion.trace}</Message.Item>:null}
                    </Message.List>
                </Message>
            }
        }

        return msj;
    }

}
/*
class MensajeTransaccion extends Component{

    state={

    }

    render(){

    }

}*/

export default MensajeTransaccion;