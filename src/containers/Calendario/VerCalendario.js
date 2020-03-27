import React from 'react';
import { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Segment, Header } from 'semantic-ui-react';

import 'moment/locale/es'
import Requester from '../../common/Services/Requester';
import CONSTANTES_GLOBALES, { const_colores } from '../../common/Constantes';
import ServicioModel from './../../common/Models/Apis/ServicioModel';


const localizer = BigCalendar.momentLocalizer(moment)
const messagesSpanish = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    showMore: total => `+ Ver más (${total})`
};

class VerCalendario extends Component {


    state = {
        fecha: this.props.fechaDefault ? this.props.fechaDefault : new Date(),
        events: [
        ],
        //culture: moment.locale("es")

    }

    componentDidMount = () => {
        //console.log("fecha: ",this.state.fecha.getMonth())
        this.cargarServicios(this.state.fecha.getMonth() + 1);

    }

    v = (event, start, end, isSelected) => {
        let newStyle = {
            backgroundColor: event.color,
            color: 'black',
            borderRadius: "0px",
            border: "none"
        };

        if (event.isMine) {
            newStyle.backgroundColor = "lightgreen"
        }

        return {
            className: "",
            style: newStyle
        };
    }

    cargarServicios = (mes) => {

        let eventosServ = [];
        Requester.getServicios({}, (rpta) => {

            rpta.cont.map((serv, i) => {
                let s = new ServicioModel(serv);

                let color = const_colores.servicio_general;
                if (s.clase === "transporte") color = const_colores.servicio_transporte;
                if (s.clase === "hospedaje") color = const_colores.servicio_hospedaje;

                eventosServ.push({
                    title: s.nombre,
                    start: moment(s.fechaEjecucion),
                    end: moment(s.fechaOut),
                    allDay: true,
                    color: color
                })

            });
            this.setState({ events: eventosServ });
        }, (rpta) => {

        });
    }

    render() {


        return <div>
            {/*<Header size="large">Calendario</Header>*/}
            <Segment style={{ height: this.props.height || "800px" }}>
                <BigCalendar
                    messages={messagesSpanish}
                    localizer={localizer}
                    events={this.state.events}
                    culture={this.state.culture}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={this.state.fecha}
                    defaultView="month"
                    eventPropGetter={this.v}
                />
            </Segment>
        </div>
    }
}

export default VerCalendario;