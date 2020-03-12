
export default class BibliaModel {

    constructor(e) {
        this.id = e.hasOwnProperty("_id") ? e._id : "";
        this.mes = e.hasOwnProperty("mes") ? e.mes : "-";
        this.anho = e.hasOwnProperty("anho") ? e.anho : "-";
    }

    static toApiObj(obj){
        let o = {
            _id:obj.id,
            mes:obj.mes,
            anho:obj.anho
        }
        return o;
    }

}