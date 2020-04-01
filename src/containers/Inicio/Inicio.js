import React from 'react';
import { Component } from 'react';
import LogoYllari from '../../assets/logo_yllari.png'

import Huascaran from '../../assets/vistas/huascaran.png'
import Machupichu from '../../assets/vistas/machupichu.png'
import Costaverde from '../../assets/vistas/costaverdehd.png'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import VerCalendario from '../Calendario/VerCalendario';
import Pruebas from './../Test/Pruebas';
import ViewFiles from './../ViewFiles/ViewFiles';

const carouselStyle = {
    height:window.screen.availHeight-300
}

class Inicio extends Component {

    componentDidMount() {

        console.log(this.props)
        console.log("height: ",window.screen);
    }

    render() {
        //return <div><h3>Pagina web en desarrollo :3</h3></div>


        let images = [ Huascaran, Machupichu, Costaverde];
        return <div style={{padding:"3rem "}}> 
            <Carousel
                showThumbs={false} 
                showArrows={true} 
                autoPlay
                stopOnHover
                infiniteLoop
                interval={8000}
                emulateTouch={true}>
                    {images.map ( (e,i) => {
                        return <div>
                            <img style = {carouselStyle} src = {e}/>
                        </div>
                    })}
            </Carousel>
            
        </div>
    }
}

export default Inicio;