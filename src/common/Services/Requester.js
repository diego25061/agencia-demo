import axios from 'axios';
import CONSTANTES_GLOBALES, { RptaTrx, Configuracion } from '../Constantes';


class Requester{

    static requestBasicoGet(direccion, funcSuccess, funcError, funcAlways){
        axios.get(direccion)
        .then(response => {
            if(funcSuccess)
                funcSuccess(response.data)
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
        axios.post(direccion, objeto)
        .then(response => {
            if(funcSuccess){
                if(response.data){
                    var resp = new RptaTrx();
                    resp.set(response.data.cont,response.data.msj,response.data.trace,response.data.cod);
                    funcSuccess(resp);
                }
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

    static getListadoFiles(funcSuccess,funcError,funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/files",funcSuccess,funcError,funcAlways);
    }

    static getHoteles(funcSuccess, funcError,funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/files",funcSuccess,funcError,funcAlways);
    }
    
    //------------------------ BIBLIAS -----------------------------------

    ///lista de biblias para elegir
    static getBibliasDropdownCompleto(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/biblias/dropdown",funcSuccess,funcError,funcAlways);
    }


    static postBiblia(objeto, funcSuccess, funcError, funcAlways){
        this.requestBasicoPost(Configuracion.ServerUrl+"/biblias/",objeto,funcSuccess,funcError,funcAlways);
    }

    //------------------------ CLIENTES -----------------------------------

    static getClientesFullDetallado(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes",funcSuccess,funcError,funcAlways);
    }

    static getClientesListaDropdown(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes/dropdown",funcSuccess,funcError,funcAlways);
    }

    static postCliente(objeto, funcSuccess, funcError, funcAlways){
        this.requestBasicoPost(Configuracion.ServerUrl+"/clientes/",objeto,funcSuccess,funcError,funcAlways);
    }

    //------------------------ HOTELES -----------------------------------

    static getHotelesListaDropdown(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/proveedores/dropdown/hotel",funcSuccess,funcError,funcAlways);
    }


    //------------------------ PROVEEDORES -----------------------------------
    
    static getProveedores( tipoProveedor, funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl + "/proveedores/" + tipoProveedor,funcSuccess,funcError,funcAlways);
    }
    
    static getProveedoresDropdown( tipoProveedor, funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/proveedores/dropdown/"+tipoProveedor,funcSuccess,funcError,funcAlways);
    }

    //hoteles
    
    static postProvHotel( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    
    static postEditarProvHotel( idProveedor, nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            idProveedor,
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.HOTEL;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/editar", body, funcSuccess,funcError,funcAlways);
    }

    //operadores

    static postProvOperador( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.OPERADOR;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //restaurantes
    
    static postProvRestaurante( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.RESTAURANTE;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //transportes

    static postProvTransporte( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.TRANSPORTE;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //guias
    
    static postProvGuia( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.GUIA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    
    //empresas
    
    static postProvEmpresa( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.EMPRESA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }

    //personas

    static postProvPersona( nombre, correo, numeroContacto, numeroContactoAdicional, correoAdicional, ciudad, funcSuccess, funcError, funcAlways){
        let body = {
            nombre,
            correo,
            numeroContacto,
            numeroCntctAdicional:numeroContactoAdicional,
            correoAdicional,
            ciudad
        };
        body.tipoProveedor = CONSTANTES_GLOBALES.AliasProovedores.PERSONA;
        this.requestBasicoPost(Configuracion.ServerUrl+"/proveedores/", body, funcSuccess,funcError,funcAlways);
    }


}

export default Requester;