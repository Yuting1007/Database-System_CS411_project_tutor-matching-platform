import React, { Component } from 'react';
import NavBar from './NavBar';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Settings</h1>
                                <p>

                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Settings;