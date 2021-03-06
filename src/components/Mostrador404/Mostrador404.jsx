import React from 'react'
import { Header, Icon,  Segment } from 'semantic-ui-react';

const Mostrador404 = (props) => {
    return (
        <Segment transparent basic textAlign="center" style={{ height: "800px" }} >
            <Header as='h1' icon style={{ height: "800px", margin: "300px 0px" }} >
                <Icon name='question circle' />
                404<Header.Subheader>La página que buscas no existe</Header.Subheader>
            </Header>
        </Segment>
    )
}

export default Mostrador404