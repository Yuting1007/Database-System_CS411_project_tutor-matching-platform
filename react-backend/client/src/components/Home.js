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
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome, {this.state.s_name}</h1>
<<<<<<< HEAD
                                
=======
                                <p>
                                    <Button onClick={this.onMatchButtonClick}>Matches</Button>

                                </p>
>>>>>>> d82cc7c651e37d3ced19b4f0d2b5074439eb76ed
                            </Col>

                            
                            <Col>
                                {/* <Button color="primary" size="sm" onClick={this.redirectToSetting}>
                                    Settings
                                </Button>                                  */}
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default StudentHome;