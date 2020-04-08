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

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s_name: localStorage.getItem('s_name') + '!'
        };
    }

    async componentDidMount() {
        this.state.s_name = localStorage.getItem('s_name')
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome, {this.state.s_name}</h1>
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

export default Home;