import {
    AsignarV
} from "../../Utils";

export default class UsuarioModel {

    userId="";
    username="";
    email="";
    roleName="";
    roleType="";

    constructor(e) {
        
        let result = {};
        AsignarV(result, "userId", e._id, null);
        AsignarV(result, "username", e.username, null);
        AsignarV(result, "email", e.email, null);
        AsignarV(result, "roleName", e.role.name, null);
        AsignarV(result, "roleType", e.role.type, null);
        
        return result;
    }

}