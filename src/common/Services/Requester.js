import axios from 'axios';
import {
    RptaTrx,
    Configuracion
} from '../Constantes';

class Requester {

    static store = {}

    static api_get(direccion, params, funcSuccess, funcError, funcAlways) {
        let query = "";
        if (params) {
            if (params.hasOwnProperty("raw")) {
                query = '?' + params.raw;
            } else {
                query = '?' + Object.keys(params).map(function (key) {
                    return key + '=' + params[key]
                }).join('&');
            }
        }
        return this.strapiRequest("get", Configuracion.ServerUrl + direccion + query, null, funcSuccess, funcError, funcAlways, true);
    }

    static api_post(direccion, data, funcSuccess, funcError, funcAlways) {
        return this.strapiRequest("post", Configuracion.ServerUrl + direccion, data, funcSuccess, funcError, funcAlways, true);
    }

    static api_put(direccion, data, funcSuccess, funcError, funcAlways) {
        return this.strapiRequest("put", Configuracion.ServerUrl + direccion, data, funcSuccess, funcError, funcAlways, true);
    }

    static api_delete(direccion, funcSuccess, funcError, funcAlways) {
        return this.strapiRequest("delete", Configuracion.ServerUrl + direccion, null, funcSuccess, funcError, funcAlways, true);
    }

    static strapiRequest(mode, direccion, data, funcSuccess, funcError, funcAlways, auth = true) {
        let string_serv_inaccesible = "Servidor inaccesible";
        let verbose = true;
        //test
        auth = true;

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
            if (verbose)
                console.error("Error en post a '", direccion, "' > ", error);
            if (funcError) {
                if (error.response) {
                    if (error.response.data) {
                        var r = new RptaTrx();
                        r.set(error.response.data);
                        funcError(r);
                    } else {
                        var r = new RptaTrx();
                        r.set({ error: "Error", message: string_serv_inaccesible, statusCode: 500 }, string_serv_inaccesible, null, 0);
                        funcError(r);
                    }
                } else {
                    //si hay un error donde el server ni responde
                    var r = new RptaTrx();
                    r.set({ error: "Error", message: string_serv_inaccesible, statusCode: 500 }, string_serv_inaccesible, null, 0);
                    funcError(r);
                }
            }
        }

        var callback_finally = (response) => {
            if (funcAlways)
                funcAlways();
        }

        //simulando lag
        //setTimeout(()=>{ 
        //}, 1000);
        let tokenValido = this.store.token ? true : false;

        if (!tokenValido)
            auth = false

        if (mode === "get") {
            axios.get(direccion, auth ? { headers: { Authorization: "Bearer " + this.store.token } } : null)
                .then(callback_then)
                .catch(callback_error)
                .finally(callback_finally);
        } else if (mode === "post") {
            axios.post(direccion, data, auth ? { headers: { Authorization: "Bearer " + this.store.token } } : null)
                .then(callback_then)
                .catch(callback_error)
                .finally(callback_finally);
        } else if (mode === "put") {
            axios.put(direccion, data, auth ? { headers: { Authorization: "Bearer " + this.store.token } } : null)
                .then(callback_then)
                .catch(callback_error)
                .finally(callback_finally);
        } else if (mode === "delete") {
            axios.delete(direccion, auth ? { headers: { Authorization: "Bearer " + this.store.token } } : null)
                .then(callback_then)
                .catch(callback_error)
                .finally(callback_finally);
        } else {
            console.error("UNKNOWN REQUEST MODE !!!");
        }

    }

    //------------------------ AUTH -----------------------------------


    static postLogin = (obj, funcSuccess, funcError, funcAlways) => {
        this.api_post("/auth/local/", obj, funcSuccess, funcError, funcAlways, false);
    }


    //------------------------ FILES -----------------------------------


    static getCantFiles = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/count", params, funcSuccess, funcError, funcAlways);
    }

    static getFiles = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/", params, funcSuccess, funcError, funcAlways);
    }

    static getFile = (id, params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/yfiles/" + id, params, funcSuccess, funcError, funcAlways);
    }

    static postFile = (file, funcSuccess, funcError, funcAlways) => {
        this.api_post("/yfiles/", file, funcSuccess, funcError, funcAlways);
    }

    static borrarFile = (fileId, funcSuccess, funcError, funcAlways) => {
        this.api_delete("/yfiles/" + fileId, funcSuccess, funcError, funcAlways);
    }

    static actualizarFile = (fileId, file, funcSuccess, funcError, funcAlways) => {
        this.api_put("/yfiles/" + fileId, file, funcSuccess, funcError, funcAlways);
    }


    //------------------------ BIBLIAS -----------------------------------


    static getBiblias = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/biblias/", params, funcSuccess, funcError, funcAlways);
    }


    static crearBiblia = (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/biblias/", model, funcSuccess, funcError, funcAlways);
    }


    //------------------------ SERVICIOS -----------------------------------


    static postServicio = (servicio, funcSuccess, funcError, funcAlways) => {
        this.api_post("/servicios/", servicio, funcSuccess, funcError, funcAlways);
    }

    static borrarServicio = (idServicio, funcSuccess, funcError, funcAlways) => {
        this.api_delete("/servicios/" + idServicio, funcSuccess, funcError, funcAlways);
    }

    static actualizarServicio = (idServicio, servicio, funcSuccess, funcError, funcAlways) => {
        this.api_put("/servicios/" + idServicio, servicio, funcSuccess, funcError, funcAlways);
    }

    static getServicios = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/servicios/", params, funcSuccess, funcError, funcAlways);
    }


    //------------------------ CLIENTES -----------------------------------

    //directos

    static getClientes = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes", params, funcSuccess, funcError, funcAlways);
    }

    static crearCliente = (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/clientes/", model, funcSuccess, funcError, funcAlways);
    }

    static editarCliente = (id, model, funcSuccess, funcError, funcAlways) => {
        this.api_put("/clientes/" + id, model, funcSuccess, funcError, funcAlways);
    }

    static eliminarCliente = (id, funcSuccess, funcError, funcAlways) => {
        this.api_delete("/clientes/" + id, funcSuccess, funcError, funcAlways);
    }


    //-----------


    static getClientesFullDetallado = (funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes/", null, funcSuccess, funcError, funcAlways);
    }

    static getClientes = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/clientes/", params, funcSuccess, funcError, funcAlways);
    }

    static postCrearCliente = (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/clientes/", model, funcSuccess, funcError, funcAlways);
    }


    //------------------------ PROVEEDORES -----------------------------------


    static getProveedores = (params, funcSuccess, funcError, funcAlways) => {
        this.api_get("/proveedors/", params, funcSuccess, funcError, funcAlways);
    }

    static crearProveedor = (model, funcSuccess, funcError, funcAlways) => {
        this.api_post("/proveedors/", model, funcSuccess, funcError, funcAlways);
    }

    static editarProveedor = (id, model, funcSuccess, funcError, funcAlways) => {
        this.api_put("/proveedors/" + id, model, funcSuccess, funcError, funcAlways);
    }

    static eliminarProveedor = (id, funcSuccess, funcError, funcAlways) => {
        this.api_delete("/proveedors/" + id, funcSuccess, funcError, funcAlways);
    }

}

export default Requester;