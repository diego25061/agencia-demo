export default class NotificationStateHolder {

    //color="";
    mostrarNotificacion=false;
    enviando=false;
    tituloRespuesta="Titulo";
    contenidoRespuesta="-";
    notif_color="green";
    notif_icono="check";
    priv_cargado=true;

    setDefault = () =>{
        //this.color="";
        this.mostrarNotificacion=false;
        this.enviando=false;
        this.tituloRespuesta="Titulo";
        this.contenidoRespuesta="-";
        this.notif_color="green";
        this.notif_icono="check";
        this.priv_cargado=true;
    }

    setAsEnviando = () => {
        this.enviando=true;
        this.notif_color="";
        this.mostrarNotificacion=true;
        this.priv_cargado=false;
    }

    setRecibidoSuccess = (titulo,mensajeRespuesta,webCode) => {
        this.enviando=false;
        this.tituloRespuesta = titulo;
        this.priv_cargado=true;
        if(webCode)
            this.contenidoRespuesta = mensajeRespuesta + " ("+webCode+")";
        else
            this.contenidoRespuesta = mensajeRespuesta ;
        this.notif_color = "green";
        this.notif_icono ="check";
    }

    setRecibidoError = (titulo,mensajeRespuesta,webCode,strapiErrorData) => {
        this.enviando=false;
        this.tituloRespuesta = titulo;
        this.priv_cargado=true;
        if(webCode)
            this.contenidoRespuesta = mensajeRespuesta + " ("+webCode+")";
        else
            this.contenidoRespuesta = mensajeRespuesta ;
        //console.log("strapi error data > ",strapiErrorData);
        if(strapiErrorData)
            if(strapiErrorData.errors){
                let s =" -> ";
                s+=JSON.stringify(strapiErrorData.errors);
                this.contenidoRespuesta+=s;
            }
        this.notif_color = "red";
        this.notif_icono ="cancel";
    }

    setHidden = () =>{
        this.setDefault();
    }

    cargando = () =>{
        return !this.priv_cargado
    }

}