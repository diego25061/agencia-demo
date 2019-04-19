import axios from 'axios';
import { RptaTrx, Configuracion } from '../Constantes';


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
        axios.get(direccion, objeto)
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


    static postBiblia(objeto, funcSuccess,funcError,funcAlways){
        this.requestBasicoPost(Configuracion.ServerUrl+"/biblias/",objeto,funcSuccess,funcError,funcAlways);
    }

    //------------------------ CLIENTES -----------------------------------

    static getClientesFullDetallado(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes",funcSuccess,funcError,funcAlways);
    }

    static getClientesListaDropdown(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/clientes/dropdown",funcSuccess,funcError,funcAlways);
    }

    static postCliente(objeto, funcSuccess,funcError,funcAlways){
        this.requestBasicoPost(Configuracion.ServerUrl+"/clientes/",objeto,funcSuccess,funcError,funcAlways);
    }

    //------------------------ HOTELES -----------------------------------

    static getHotelesListaDropdown(funcSuccess, funcError, funcAlways){
        this.requestBasicoGet(Configuracion.ServerUrl+"/hoteles/dropdown",funcSuccess,funcError,funcAlways);
    }
}

export default Requester;