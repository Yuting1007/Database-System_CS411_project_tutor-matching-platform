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
            redirect_settings: false,
            redirect_settings_link: '/tutor-settings'
        };
    }

    async componentDidMount() {
        this.state.t_name = sessionStorage.getItem('t_name')
    }

    redirectToSetting = () => {
        this.setState({
            redirect_settings: !this.state.redirect_settings
        })
    }

    render() {
        if (this.state.redirect_settings) {
            return <Redirect to={this.state.redirect_settings_link} />
        }
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome, {this.state.t_name}</h1>
                            </Col>

                            <Col>
                                <Button color="primary" size="sm" onClick={this.redirectToSetting}>
                                    Settings
                                </Button>                                 
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default TutorHome;