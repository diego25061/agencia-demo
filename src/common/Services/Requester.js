import axios from 'axios';
import CONSTANTES_GLOBALES, {
    RptaTrx,
    Configuracion
} from '../Constantes';
import { URLSearchParams } from 'url';

class Requester {

    static store = {}

    static api_get(direccion,params,funcSuccess,funcError,funcAlways){
        let query = "";
        if(params){
            if(params.hasOwnProperty("raw")){
                query='?'+params.raw;
            }else{
                query = '?'+Object.keys(params).map(function(key) {
                    return key + '=' + params[key]
                }).join('&');
            }
        }
        return this.strapiRequest("get",Configuracion.ServerUrl+direccion+query,null,funcSuccess,funcError,funcAlways,true);
    }

    static api_post(direccion,data,funcSuccess,funcError,funcAlways){
        return this.strapiRequest("post",Configuracion.ServerUrl+direccion,data,funcSuccess,funcError,funcAlways,true);
    }

    static api_put(direccion,data,funcSuccess,funcError,funcAlways){
        return this.strapiRequest("put",Configuracion.ServerUrl+direccion,data,funcSuccess,funcError,funcAlways,true);
    }

    static api_delete(direccion,funcSuccess,funcError,funcAlways){
        return this.strapiRequest("delete",Configuracion.ServerUrl+direccion,null,funcSuccess,funcError,funcAlways,true);
    }

    static strapiRequest(mode, direccion, data, funcSuccess, funcError, funcAlways, auth=true) {
        let string_serv_inaccesible = "Servidor inaccesible";
        let verbose = true;
        //test
        auth=true;

        var callback_then = (response) => {
            try {
                if (funcSuccess) {
                    if (response.data) {
                        var resp = new RptaTrx();
                        resp.set(response.data);
                        funcSuccess(resp);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }

        var callback_error = (error) => {
            if(verbose)
                console.error("Error en post a '",direccion,"' > ",error);
            if (funcError) {
                if (error.response) {
                    if (error.response.data) {
                        var r = new RptaTrx();
                        r.set(error.response.data);
                        funcError(r);
                    } else {
                        var r = new RptaTrx();
                        r.set({error:"Error", message:string_serv_inaccesible,statusCode:500}, string_serv_inaccesible, null, 0);
                        funcError(r);
                    }
                } else {
                    //si hay un error donde el server ni responde
                    var r = new RptaTrx();
                    r.set({error:"Error", message:string_serv_inaccesible,statusCode:500}, string_serv_inaccesible, null, 0);
                    funcError(r);
                }
            }
        }

        var callback_finally = (response) => {
            if(funcAlways)
                funcAlways();
        }
        
        //simulando lag
        //setTimeout(()=>{ 
        //}, 1000);

        if(mode==="get"){
            axios.get(direccion,auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null)
            .then(callback_then)
            .catch(callback_error)
            .finally(callback_finally);
        }else if (mode==="post"){
            axios.post(direccion,data,auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null)
            .then(callback_then)
            .catch(callback_error)
            .finally(callback_finally);
        }else if (mode==="put"){
            axios.put(direccion,data,auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null)
            .then(callback_then)
            .catch(callback_error)
            .finally(callback_finally);
        }else if (mode==="delete"){
            axios.delete(direccion,auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null)
            .then(callback_then)
            .catch(callback_error)
            .finally(callback_finally);
        }else{
            console.error("UNKNOWN REQUEST MODE !!!");
        }

    }

    static requestBasicoGet(direccion, funcSuccess, funcError, funcAlways, auth=true) {
        axios.get(direccion
        //,
            /*auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null*/)
            .then(response => {
                try {
                    if (funcSuccess)
                        funcSuccess(response.data)
                } catch (err) {
                    console.log(err);
                }
            }).catch(error => {
                if (funcError) {
                    if (error.response) {
                        if (error.response.data)
                            funcError(new RptaTrx(error.response.data));
                        else {
                            var r = new RptaTrx();
                            r.set(null, "Servidor inaccesible", null, 0);
                            funcError(r);
                        }
                    } else {
                        //si hay un error donde el server ni responde
                        var r = new RptaTrx();
                        r.set(null, "Servidor inaccesible", null, 0);
                        funcError(r);
                    }
                }
            }).finally( () => {
                if(funcAlways)
                    funcAlways()
                }); //.finally(response=>{})
    }


    static requestBasicoPost(direccion, objeto, funcSuccess, funcError, funcAlways, auth=true) {
        axios.post(direccion, objeto/*,
            auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null*/)
            .then(response => {
                try {
                    if (funcSuccess) {
                        if (response.data) {
                            var resp = new RptaTrx();
                            resp.set(response.data, "Success");
                            funcSuccess(resp);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }).catch(error => {
                console.error("Error en POST!",error);
                if (funcError) {
                    if (error.response) {
                        if (error.response.data) {
                            funcError(new RptaTrx(error.response.data, error));
                        } else {
                            var r = new RptaTrx();
                            r.set(null, "Servidor inaccesible", null, 0);
                            funcError(r);
                        }
                    } else {
                        //si hay un error donde el server ni responde
                        var r = new RptaTrx();
                        r.set(null, "Servidor inaccesible", null, 0);
                        funcError(r);
                    }
                }
            }).finally( () => {
                if(funcAlways)
                    funcAlways()
                });
    }

    
    static requestPut(direccion, objeto, funcSuccess, funcError, funcAlways, auth=true) {
        axios.put(direccion, objeto/*,
            auth ? {headers:{Authorization:"Bearer "+ this.store.token}}: null*/)
            .then(response => {
                try {
                    if (funcSuccess) {
                        if (response.data) {
                            var resp = new RptaTrx();
                            resp.set(response.data, "Success");
                            funcSuccess(resp);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }).catch(error => {
                console.error("Error en PUT!",error);
                if (funcError) {
                    if (error.response) {
                        if (error.response.data) {
                            funcError(new RptaTrx(error.response.data, error));
                        } else {
                            var r = new RptaTrx();
                            r.set(null, "Servidor inaccesible", null, 0);
                            funcError(r);
                        }
                    } else {
                        //si hay un error donde el server ni responde
                        var r = new RptaTrx();
                        r.set(null, "Servidor inaccesible", null, 0);
                        funcError(r);
                    }
                }
            }).finally( () => {
                if(funcAlways)
                    funcAlways()
                });
    }
    //------------------------ MISC -----------------------------------

    static getPing = (funcSuccess, funcError, funcAlways ) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/misc/ping", funcSuccess, funcError, funcAlways);
    }

    static getInfo = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/misc/info", funcSuccess, funcError, funcAlways);
    }

    //------------------------ AUTH -----------------------------------

    static postLogin = (obj, funcSuccess, funcError, funcAlways) => {
        this.api_post( "/auth/local/", obj, funcSuccess, funcError, funcAlways, false);
    }

    //------------------------ FILES -----------------------------------



    static getCantFiles = (params,funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/count",params, funcSuccess, funcError, funcAlways);
    }

    static getFiles = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/",params, funcSuccess, funcError, funcAlways);
    }


    static getFile = (id ,params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/"+id ,params, funcSuccess, funcError, funcAlways);
    }


    static postFile = (file, funcSuccess, funcError, funcAlways) => {
        this.api_post("/yfiles/", file, funcSuccess, funcError, funcAlways);
    }

    static borrarFile= (fileId , funcSuccess, funcError, funcAlways) => {
        this.api_delete("/yfiles/"+fileId ,  funcSuccess, funcError, funcAlways);
    }

    static actualizarFile = (fileId , file, funcSuccess, funcError, funcAlways) => {
        this.api_put("/yfiles/"+fileId , file, funcSuccess, funcError, funcAlways);
    }
    
    static postEditarFile = (file, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/files/editar/", file, funcSuccess, funcError, funcAlways);
    }

    static postBorrarFile = (idFile, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/files/eliminar/"+idFile, null, funcSuccess, funcError, funcAlways);
    }

    static getListadoFiles = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/files", funcSuccess, funcError, funcAlways);
    }

    static getHoteles = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/files", funcSuccess, funcError, funcAlways);
    }

    //------------------------ BIBLIAS -----------------------------------

    static getBiblias = (params,funcSuccess, funcError, funcAlways) => {
        this.api_get("/biblias/",params, funcSuccess, funcError, funcAlways);
    }


    static crearBiblia = (model ,funcSuccess , funcError, funcAlways)=>{
        this.api_post("/biblias/",model,funcSuccess,funcError,funcAlways);
    }

    ///lista de biblias para elegir
    static getBibliasDropdownCompleto = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/biblias/dropdown", funcSuccess, funcError, funcAlways);
    }

    static getBibliasDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/biblias/", funcSuccess, funcError, funcAlways , true);
    }

/*
    static postBiblia = (objeto, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/biblias/", objeto, funcSuccess, funcError, funcAlways);
    }
    */

    //------------------------ SERVICIOS -----------------------------------


    static postServicio = (servicio, funcSuccess, funcError, funcAlways) => {
        this.api_post("/servicios/", servicio, funcSuccess, funcError, funcAlways);
    }

    static borrarServicio = (idServicio , funcSuccess, funcError, funcAlways) => {
        this.api_delete("/servicios/"+idServicio ,  funcSuccess, funcError, funcAlways);
    }

    static actualizarServicio = (idServicio , servicio, funcSuccess, funcError, funcAlways) => {
        this.api_put("/servicios/"+idServicio , servicio, funcSuccess, funcError, funcAlways);
    }

    static getServicios = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/servicios/",params, funcSuccess, funcError, funcAlways);
    }

    static getServiciosTodos = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/servicios", funcSuccess, funcError, funcAlways);
    }


    static getServiciosPorMes = (mes, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/servicios/mes/"+mes, funcSuccess, funcError, funcAlways);
    }

    static getServiciosGeneralesDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/servicios/generales", funcSuccess, funcError, funcAlways);
    }

    static getServiciosTransporteDetalle = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/servicios/transportes", funcSuccess, funcError, funcAlways);
    }

    
    static getServiciosHospedaje = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/servicios/hospedajes", funcSuccess, funcError, funcAlways);
    }

/*
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
        funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/servicios/", {
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
        }, funcSuccess, funcError, funcAlways);
    }*/

    //------------------------ CLIENTES -----------------------------------

    //directos
    

    static getClientes = ( params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes",params,funcSuccess,funcError,funcAlways);
    }

    static crearCliente= (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/clientes/",model,funcSuccess,funcError,funcAlways);
    }

    static editarCliente = (id, model, funcSuccess, funcError, funcAlways) => {
        this.api_put("/clientes/"+id,model,funcSuccess,funcError,funcAlways);
    }

    static eliminarCliente = (id, funcSuccess, funcError, funcAlways)=>{
        this.api_delete("/clientes/"+id,funcSuccess,funcError,funcAlways);
    }

    //-----------


    static getClientesFullDetallado = ( funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes/",null,funcSuccess,funcError,funcAlways);
    }
    static getClientes = ( params,funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes/",params,funcSuccess,funcError,funcAlways);
    }

    static getClientesOpMin = ( funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes/" ,{clase:"minorista"},funcSuccess, funcError, funcAlways);
    }
    
    static getClientesOpMay = ( funcSuccess, funcError, funcAlways) => {
        this.api_get( "/clientes/" , {clase:"mayorista"},funcSuccess, funcError, funcAlways);
    }



    static getClientesListaDropdown = (funcSuccess, funcError, funcAlways) => {
        this.api_get( "/clientes/dropdown",null, funcSuccess, funcError, funcAlways);
    }

    static postCrearCliente = (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/clientes/",model,funcSuccess,funcError,funcAlways);
    }

    static postCliente = (tipo, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, pais, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            CorreoContacto: correo,
            numeroContacto,
            numeroAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad,
            pais
        };
        body.tipo = tipo;
        this.requestBasicoPost(Configuracion.ServerUrl + "/clientes/", body, funcSuccess, funcError, funcAlways);
    }


    static postEditarCliente = (tipo, idCliente, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, pais, funcSuccess, funcError, funcAlways) => {
        let body = {
            idCliente,
            nombre,
            CorreoContacto: correo,
            numeroContacto,
            numeroAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad,
            pais
        };
        body.tipo = tipo;
        console.log("weeeeeeeee", body);
        this.requestBasicoPost(Configuracion.ServerUrl + "/clientes/editar", body, funcSuccess, funcError, funcAlways);
    }

    static postEliminarCliente = (id, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/clientes/eliminar/" + id, null, funcSuccess, funcError, funcAlways);
    }


    //------------------------ HOTELES -----------------------------------

    static getHotelesListaDropdown = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/dropdown/hotel", funcSuccess, funcError, funcAlways);
    }


    //------------------------ PROVEEDORES -----------------------------------

    static getProveedores = ( params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/proveedors/" ,params, funcSuccess, funcError, funcAlways);
    }

    static crearProveedor= (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/proveedors/",model,funcSuccess,funcError,funcAlways);
    }

    static editarProveedor = (id, model, funcSuccess, funcError, funcAlways) => {
        this.api_put("/proveedors/"+id,model,funcSuccess,funcError,funcAlways);
    }

    static eliminarProveedor = (id, funcSuccess, funcError, funcAlways)=>{
        this.api_delete("/proveedors/"+id,funcSuccess,funcError,funcAlways);
    }

    //------


    static getProveedoresMenosTransportes = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/tipos?incluir=GUIAA,EMPRE,RESTA,HOTEL,PERSO,OPERA", funcSuccess, funcError, funcAlways);
    }

    static getProveedoresTransportes = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/tipos?incluir=trans", funcSuccess, funcError, funcAlways);
    }

    static getProveedoresHoteles = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/tipos?incluir=hotel", funcSuccess, funcError, funcAlways);
    }

    static getProveedoresDropdown = (tipoProveedor, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/dropdown/" + tipoProveedor, funcSuccess, funcError, funcAlways);
    }

    static postEliminarProv = (id, funcSuccess, funcError, funcAlways) => {
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/eliminar/" + id, null, funcSuccess, funcError, funcAlways);
    }

    static postProveedor = (tipo, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = tipo;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    static postEditarProv = (alias, idProveedor, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            idProveedor,
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = alias;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/editar", body, funcSuccess, funcError, funcAlways);
    }

    //hoteles

    static postProvHotel = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }



    static postEditarProvHotel = (idProveedor, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            idProveedor,
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/editar", body, funcSuccess, funcError, funcAlways);
    }

    //operadores

    static postProvOperador = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.OPERADOR;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    //restaurantes

    static postProvRestaurante = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.RESTAURANTE;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    //transportes

    static postProvTransporte = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.TRANSPORTE;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    //guias

    static postProvGuia = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.GUIA;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }


    //empresas

    static postProvEmpresa = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.EMPRESA;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    //personas

    static postProvPersona = (nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways) => {
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroContactoAdicional: numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.PERSONA;
        this.requestBasicoPost(Configuracion.ServerUrl + "/proveedores/", body, funcSuccess, funcError, funcAlways);
    }

    //------------------------ CIUDADES -----------------------------------

    static getCiudades = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/ciudades/", funcSuccess, funcError, funcAlways);
    }


    //------------------------ PAISES -----------------------------------

    static getPaises = (funcSuccess, funcError, funcAlways) => {
        this.requestBasicoGet(Configuracion.ServerUrl + "/paises/", funcSuccess, funcError, funcAlways);
    }

}

export default Requester;