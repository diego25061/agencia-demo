import axios from 'axios';
import CONSTANTES_GLOBALES, { RptaTrx, Configuracion } from '../Constantes';


class Requester{

    static requestBasicoGet(direccion, funcSuccess, funcError, funcAlways){
        axios.get(direccion)
        .then(response => {
            try{
                if(funcSuccess)
                    funcSuccess(response.data)
            }catch(err) {
                console.log(err);
            }
        }).catch(error=>{
            if(funcError){
                if(error.response){
                    if(error.response.data)
                        funcError(new RptaTrx(error.response.data));
                    else{
                        var r = new RptaTrx();
                        r.set(null,"Servidor inaccesible",null,0);
                        funcError(r);
                    }
                }else{
                    //si hay un error donde el server ni responde
                    var r = new RptaTrx();
                    r.set(null,"Servidor inaccesible",null,0);
                    funcError(r);
                }
            }
        })  //.finally(response=>{})
    }

    
    static requestBasicoPost(direccion, objeto, funcSuccess, funcError, funcAlways){
        //console.log("enviando POSTTTTTTTTTTTTTTTTTTTTTTTTTT :",direccion," obj: ",objeto);
        axios.post(direccion, objeto)
        .then(response => {
            try{
                if(funcSuccess){
                    if(response.data){
                        var resp = new RptaTrx();
                        resp.set(response.data.cont,response.data.msj,response.data.trace,response.data.cod);
                        funcSuccess(resp);
                    }
                }
            }catch(err) {
                console.log(err);
            }
        }).catch(error=>{
            if(funcError){
                if(error.response){
                    if(error.response.data){
                        funcError(new RptaTrx(error.response.data));
                    }
                    else{
                        var r = new RptaTrx();
                        r.set(null,"Servidor inaccesible",null,0);
                        funcError(r);
                    }
                }else{
                    //si hay un error donde el server ni responde
                    var r = new RptaTrx();
                        r.set(null,"Servidor inaccesible",null,0);
                        funcError(r);
                }
            }
        })
    }


    
    //------------------------ FILES -----------------------------------


    static getListadoFiles=(funcSuccess,funcError,funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/files",funcSuccess,funcError,funcAlways);
    }

    static getHoteles=(funcSuccess, funcError,funcAlways)=>{
        this.requestBasicoGet(Configuracion.ServerUrl+"/files",funcSuccess,funcError,funcAlways);
    }
    
    //------------------------ BIBLIAS -----------------------------------

    ///lista de biblias para elegir
    static getBibliasDropdownCompleto = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/biblias/dropdown",funcSuccess,funcError,funcAlways);
    }

    static getBibliasDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/biblias/",funcSuccess,funcError,funcAlways);
    }


    static postBiblia = (objeto, funcSuccess, funcError, funcAlways)=>{
        this.requestBasicoPost(Configuracion.ServerUrl+"/biblias/",objeto,funcSuccess,funcError,funcAlways);
    }
    
    //------------------------ SERVICIOS -----------------------------------

    static getServiciosGeneralesDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/servicios/generales",funcSuccess,funcError,funcAlways);
    }

    static getServiciosTransporteDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/servicios/transportes",funcSuccess,funcError,funcAlways);
    }

    static postServicio = (
        idFile,
        idProveedor,
        fecha,
        tipoServicio,
        nombre,
        horaRecojo,
        horaSalida,
        vuelo,
        pasajeros,
        vr,
        tc,
        observaciones,
        ciudad,
        nombrePasajero,
        tren,
        alm,
        transporte,
        hotel,
        funcSuccess, funcError, funcAlways)=>{
        this.requestBasicoPost(Configuracion.ServerUrl+"/servicios/",
        {
            idFile,
            idProveedor,
            fecha,
            tipoServicio,
            nombre,
            horaRecojo,
            horaSalida,
            vuelo,
            pasajeros,
            vr,
            tc,
            observaciones,
            ciudad,
            nombrePasajero,
            tren,
            alm,
            transporte,
            hotel
        },funcSuccess,funcError,funcAlways);
    }

    //------------------------ CLIENTES -----------------------------------

    static getClientesFullDetallado = (alias, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes/"+alias,funcSuccess,funcError,funcAlways);
    }

    static getClientesListaDropdown = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes/dropdown",funcSuccess,funcError,funcAlways);
    }
    
    static postCliente = ( tipo, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, pais, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            CorreoContacto:correo,
            numeroContacto,
            numeroAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad,
            pais
        };
        body.tipo = tipo;
        this.requestBasicoPost(Configuracion.ServerUrl+"/clientes/", body, funcSuccess,funcError,funcAlways);
    }

    
    static postEditarCliente = ( tipo, idCliente, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, pais, funcSuccess, funcError, funcAlways) => {
        let body = {
            idCliente,
            nombre,
            CorreoContacto:correo,
            numeroContacto,
            numeroAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad,
            pais
        };
        body.tipo = tipo;
        console.log("weeeeeeeee",body);
        this.requestBasicoPost(Configuracion.ServerUrl+"/clientes/editar", body, funcSuccess,funcError,funcAlways);
    }
    
    static postEliminarCliente = ( id, funcSuccess, funcError, funcAlways) =>{
        this.requestBasicoPost(Configuracion.ServerUrl + "/clientes/eliminar/" + id, null, funcSuccess,funcError,funcAlways);
    }
    

    //------------------------ HOTELES -----------------------------------

    static getHotelesListaDropdown = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/proveedores/dropdown/hotel",funcSuccess,funcError,funcAlways);
    }


    //------------------------ PROVEEDORES -----------------------------------
    
    static getProveedores = ( tipoProveedor, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/" + tipoProveedor,funcSuccess,funcError,funcAlways);
    }
    
    static getProveedoresDropdown = ( tipoProveedor, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl+"/proveedores/dropdown/"+tipoProveedor,funcSuccess,funcError,funcAlways);
    }
    
    static postEliminarProv = ( id, funcSuccess, funcError, funcAlways) =>{
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/eliminar/" + id, null, funcSuccess,funcError,funcAlways);
    }
    
    static postEditarProv = (alias, idProveedor, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            idProveedor,
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = alias;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/editar", body, funcSuccess,funcError,funcAlways);
    }

    //hoteles
    
    static postProvHotel = ( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }


    
    static postEditarProvHotel = ( idProveedor, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            idProveedor,
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/editar", body, funcSuccess,funcError,funcAlways);
    }

    //operadores

    static postProvOperador=( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.OPERADOR;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //restaurantes
    
    static postProvRestaurante=( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.RESTAURANTE;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //transportes

    static postProvTransporte=( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.TRANSPORTE;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //guias
    
    static postProvGuia=( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.GUIA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    
    //empresas
    
    static postProvEmpresa=( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.EMPRESA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //personas

    static postProvPersona = ( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways)=>{
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.PERSONA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //------------------------ CIUDADES -----------------------------------

    static getCiudades = (  funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/ciudades/" ,funcSuccess,funcError,funcAlways);
    }

    
    //------------------------ PAISES -----------------------------------

    static getPaises = ( funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/paises/" ,funcSuccess,funcError,funcAlways);
    }

}

export default Requester;