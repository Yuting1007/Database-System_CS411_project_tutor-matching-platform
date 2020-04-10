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

class TutorHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            t_name: sessionStorage.getItem('t_name') + '!'
        };
    }

    async componentDidMount() {
        this.state.t_name = sessionStorage.getItem('t_name')
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome, {this.state.t_name}</h1>
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

export default TutorHome;