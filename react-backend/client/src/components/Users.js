import React, { Component } from 'react';
import Start from './Start'
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


class Users extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
        this.state = {
            users: []
        };
    }

    
  
    async componentDidMount() {
      fetch('/users')
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(users => {
          console.log(users);
          this.setState({ users })
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Users</h1>
                                <div className="App">
                                {this.state.users.map(user =>
                                    <div key={user.s_id}>{user.s_name}</div>
                                )}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Users;