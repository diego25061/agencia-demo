import React from 'react'
import { Header, Icon, Dimmer, Segment } from 'semantic-ui-react';

const Mostrador404 = (props) => {
    return (
        <Segment textAlign="center" style={{ height: "400px" }} >
            <Header as='h1' icon style={{ height: "400px", margin: "100px 0px" }} >
                <Icon name='question circle' />
                404<Header.Subheader>La página que buscas no existe</Header.Subheader>
            </Header>
        </Segment>
    )
}

export default Mostrador404