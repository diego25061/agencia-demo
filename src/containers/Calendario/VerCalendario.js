import React from 'react';
import { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Segment, Header } from 'semantic-ui-react';

import 'moment/locale/es'
import Requester from '../../common/Services/Requester';
import CONSTANTES_GLOBALES from '../../common/Constantes';


const localizer = BigCalendar.momentLocalizer(moment)

class VerCalendario extends Component {


    state = {
        fecha:this.props.fechaDefault?this.props.fechaDefault : new Date(),
        events: [
        ],
        //culture: moment.locale("es")

    }

    componentDidMount=()=>{
        //console.log("fecha: ",this.state.fecha.getMonth())
        this.cargarServicios(this.state.fecha.getMonth()+1);

    }
 
    v = (event, start, end, isSelected) => {
        let newStyle = {
          backgroundColor: event.color,
          color: 'black',
          borderRadius: "0px",
          border: "none"
        };
  
        if (event.isMine){
          newStyle.backgroundColor = "lightgreen"
        }
  
        return {
          className: "",
          style: newStyle
        };
      }

    cargarServicios= (mes)=>{

        let eventosServ = [];
        Requester.getServiciosTodos( (rpta) =>{
            rpta.cont.map((s,i)=>{
                //let lista = eventosServ ;
                if(s.tipoServicio===CONSTANTES_GLOBALES.AliasServicios.SERVICIO){
                    /*console.log("FECHA"+s.fecha.split("-")[0]+ " => " + moment(s.fecha).format("YYYY MM DD") + " =>>< " 
                    +new Date(s.fecha.split("-")[0],s.fecha.split("-")[1],s.fecha.split("-")[2]) );*/
                eventosServ.push({
                    title:s.nombre,
                    
                    start: moment(s.fecha),
                    end: moment(s.fecha),
                    allDay:true,
                    color:'yellow'
                })
            }else{
                eventosServ.push({
                    title:s.nombre,
                    start:moment(s.fecha),
                    end:moment(s.fecha),
                    allDay:true,
                    color:'lightblue'
                })
                }
            });
            this.setState({events:eventosServ});
        }, (rpta) => {
            
        });
    }

    render() {


        return <div>
            {/*<Header size="large">Calendario</Header>*/}
            <Segment style={{ height: "800px" }}>
                <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    culture={this.state.culture}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={this.state.fecha }
                    defaultView="month"
                    eventPropGetter={this.v}
                />
            </Segment>
        </div>
    }
}

export default VerCalendario;