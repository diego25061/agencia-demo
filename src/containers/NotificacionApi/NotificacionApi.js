import React from 'react'
import { Message, Icon } from 'semantic-ui-react';


export default class NotificacionApi extends React.Component {

    static defaultProps = {
        title: "Mensaje",
        content: "Contenido",
        loading: false,
        loadingTitle: "Cargando...",
        loadingContent: "Realizando transacción",
        color:"",
        icon:""
    }

    render = () => {
        if(this.props.disabled)
            return <></>

        if (this.props.loading) {
            return <Message color={this.props.color}  icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>{this.props.loadingTitle}</Message.Header>
                    {this.props.loadingContent}
                    {this.props.children}
                </Message.Content>
            </Message>
        } else {
            return <Message color={this.props.color} icon>
                <Icon name={this.props.icon}/>
                <Message.Content>
                    <Message.Header>{this.props.title}</Message.Header>
                    {this.props.content}
                    {this.props.children}
                </Message.Content>
            </Message>
        }
    }
}