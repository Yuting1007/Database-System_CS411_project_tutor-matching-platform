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

class StudentHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s_name: sessionStorage.getItem('s_name') + '!',
            s_id: sessionStorage.getItem('s_id'),
            redirect_settings: false,
            redirect_settings_link: '/settings'
        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
    }

    //this.toggleRedirect_settings = this.toggleRedirect_settings.bind();

    async componentDidMount() {
        this.state.s_name = sessionStorage.getItem('s_name')
    }

    onMatchButtonClick = () => {
        this.props.history.push('/matches')
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
            <React.Fragment>
            
                <div>
                    <p>  eduFY</p>
                    <Nav tabs>
                        <NavItem>
                        <NavLink href="/student/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/matches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                        </NavItem>
                    </Nav>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Welcome, {this.state.s_name}</h1>
                                    <p>
                                        Your student ID is {this.state.s_id}
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                            <p>
                                <Button color="primary" size="lg" onClick={this.onMatchButtonClick} block>Matches</Button>
                            </p>
                                
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                </div>
            </React.Fragment>
        );
    }
}

export default StudentHome;