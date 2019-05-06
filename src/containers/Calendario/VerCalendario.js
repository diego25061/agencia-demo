import React from 'react';
import {Component} from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Segment } from 'semantic-ui-react';


const localizer = BigCalendar.momentLocalizer(moment)

class VerCalendario extends Component{


    state={
        events:[ 
        ]
    }

    render(){
                
        return <Segment style={{height:"800px"}}>
            <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
            />
        </Segment>
    }
}

export default VerCalendario;