import moment from 'moment'
import {
    AsignarV
} from '../../Utils';

export default class ServicioModel {

    constructor(obj) {
        let result = {};

        if (obj) {
            AsignarV(result, "idServicio", obj._id, "");
            AsignarV(result, "nombre", obj.nombre, "");
            AsignarV(result, "ciudad", obj.ciudad, "");
            AsignarV(result, "fechaEjecucion", moment(obj.fechaEjecucion, 'YYYY-MM-DD').format('YYYY-MM-DD'), "");
            AsignarV(result, "fechaOut", moment(obj.fechaOut, 'YYYY-MM-DD').format('YYYY-MM-DD'), "");
            AsignarV(result, "nombrePasajero", obj.nombrePasajero, "");
            AsignarV(result, "cantPasajeros", obj.cantPasajeros, "");
            AsignarV(result, "horaInicio", moment(obj.horaInicio, 'HH:mm:ss.SSS').format('HH:mm'), "");
            AsignarV(result, "horaFinal", moment(obj.horaFinal, 'HH:mm:ss.SSS').format('HH:mm'), "");

            AsignarV(result, "descripcion", obj.descripcion, "");
            AsignarV(result, "tren", obj.tren, "");
            AsignarV(result, "alm", obj.alm, "");
            AsignarV(result, "vuelo", obj.vuelo, "");
            AsignarV(result, "vr", obj.vr, "");
            AsignarV(result, "tc", obj.tc, "");
            AsignarV(result, "proveedor", obj.proveedor, "");
            AsignarV(result, "clase", obj.clase, "general");
            AsignarV(result, "file", obj.yfile, "");
        }
        return result;
    }

    static toApiObj(obj) {
        let result = {};

        if (obj) {
            AsignarV(result, "_id", obj.idServicio, null);
            AsignarV(result, "nombre", obj.nombre, null);
            AsignarV(result, "ciudad", obj.ciudad, null);

            AsignarV(result, "fechaEjecucion", moment(obj.fechaEjecucion, 'YYYY-MM-DD').format('YYYY-MM-DD'), null);
            AsignarV(result, "fechaOut", moment(obj.fechaOut, 'YYYY-MM-DD').format('YYYY-MM-DD'), null);

            AsignarV(result, "nombrePasajero", obj.nombrePasajero, null);
            AsignarV(result, "cantPasajeros", obj.cantPasajeros, null);

            AsignarV(result, "horaInicio", moment(obj.horaInicio, 'HH:mm').format('HH:mm:ss.SSS'), null);
            AsignarV(result, "horaFinal", moment(obj.horaFinal, 'HH:mm').format('HH:mm:ss.SSS'), null);

            AsignarV(result, "descripcion", obj.descripcion, null);
            AsignarV(result, "tren", obj.tren, null);
            AsignarV(result, "alm", obj.alm, null);
            AsignarV(result, "vuelo", obj.vuelo, null);
            AsignarV(result, "vr", obj.vr, null);
            AsignarV(result, "tc", obj.tc, null);
            AsignarV(result, "proveedor", obj.proveedor, null);
            AsignarV(result, "clase", obj.clase, "general");
            AsignarV(result, "yfile", obj.file, null);
        }
        return result;
    }

}