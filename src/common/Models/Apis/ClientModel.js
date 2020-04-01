import {
    AsignarV, AsignarCond
} from "../../Utils";

export default class ClientModel {

    constructor(e) {
        let result = {};
        if(e){
            AsignarV(result, "idCliente", e._id, "");
            AsignarV(result, "nombre", e.nombre, "");
            AsignarV(result, "clase", e.clase, "");
            
            if(e.hasOwnProperty("datos") && e.datos ){
                AsignarV(result, "correoContacto", e.datos.correo, "");
                AsignarV(result, "correoAdicional", e.datos.correo2, "");
                AsignarV(result, "numeroContacto", e.datos.numero, "");
                AsignarV(result, "numeroContactoAdicional", e.datos.numero2, "");
                AsignarV(result, "ciudad", e.datos.ciudad, "");
                AsignarV(result, "pais", e.datos.pais, "");
            }
        }
        return result;
    }

    static toApiObj(obj) {
        let o = {};
        if(obj){
            AsignarCond(o, "_id", obj.idCliente, null);
            AsignarCond(o, "nombre", obj.nombre, null);
            AsignarCond(o, "clase", obj.clase, null);
            let datos = {};

            AsignarCond(datos, "correo", obj.correoContacto, null);
            AsignarCond(datos, "correo2", obj.correoAdicional, null);
            AsignarCond(datos, "numero", obj.numeroContacto, null);
            AsignarCond(datos, "numero2", obj.numeroContactoAdicional, null);
            AsignarCond(datos, "ciudad", obj.ciudad, null);
            AsignarCond(datos, "pais", obj.pais, null);
            o.datos = datos;
        }

        return o;
    }

}