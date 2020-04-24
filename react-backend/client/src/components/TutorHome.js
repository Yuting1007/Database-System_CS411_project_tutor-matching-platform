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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";

class TutorHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            t_name: sessionStorage.getItem('t_name') + '!',
            t_id: sessionStorage.getItem('t_id')
        };
    }

    async componentDidMount() {
        this.state.t_name = sessionStorage.getItem('t_name')
    }

    render() {
        return (
            <div>
                <p>eduFY</p>
                <Nav tabs>
                    <NavItem>
                    <NavLink href="/tutor/home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/tutor-matches">Matches</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/tutor-settings">Settings</NavLink>
                    </NavItem>
                </Nav>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome, {this.state.t_name}</h1>
                                <p>
                                    Your tutor ID is {this.state.t_id}
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