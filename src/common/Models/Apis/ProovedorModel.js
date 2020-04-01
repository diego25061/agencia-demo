import {
    AsignarV,
    AsignarCond
} from "../../Utils";


export default class ProveedorModel {

    constructor(e) {

        let result = {};
        if (e) {
            AsignarV(result, "idProveedor", e._id, "");
            AsignarV(result, "nombre", e.nombre, "");
            AsignarV(result, "clase", e.clase, "");

            AsignarV(result, "correoContacto", e.correo, "");
            AsignarV(result, "correoAdicional", e.correo2, "");
            AsignarV(result, "numeroContacto", e.numero, "");
            AsignarV(result, "numeroContactoAdicional", e.numero2, "");
            AsignarV(result, "ciudad", e.ciudad, "");
        }
        return result;

    }

    static toApiObj(obj) {

        let o = {};

        if (obj) {
            AsignarCond(o, "_id", obj.id, null);
            AsignarCond(o, "nombre", obj.nombre, null);
            AsignarCond(o, "clase", obj.clase, null);
            AsignarCond(o, "correo", obj.correoContacto, null);
            AsignarCond(o, "correo2", obj.correoAdicional, null);
            AsignarCond(o, "numero", obj.numeroContacto, null);
            AsignarCond(o, "numero2", obj.numeroContactoAdicional, null);
            AsignarCond(o, "ciudad", obj.ciudad, null);
        }
        return o;
    }

}