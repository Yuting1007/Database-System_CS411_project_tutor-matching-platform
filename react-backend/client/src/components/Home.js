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
            s_name: sessionStorage.getItem('s_name') + '!'
        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
    }

    async componentDidMount() {
        this.state.s_name = sessionStorage.getItem('s_name')
    }

    onMatchButtonClick = () => {
        this.props.history.push('/matches');
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
                                    <Button onClick={this.onMatchButtonClick}>Matches</Button>

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