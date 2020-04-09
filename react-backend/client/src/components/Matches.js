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
    Button,
    Table
} from 'reactstrap';
import '../css/Matches.css'

class Matches extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
        this.state = {
            students: []
        };
    }

    
  
    async componentDidMount() {
      fetch('/matches/all-students')
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(students => {
          console.log(students);
          this.setState({ students })
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Matches</h1>
                                <p>

                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Table striped className="matches-table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Location</th>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => 
                        <tr key={student.s_id}>
                            <td classname="id-col">{student.s_id}</td>
                            <td>{student.s_name}</td>
                            <td>{student.s_age}</td>
                            <td>{student.s_location}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                
                

            </div>
        );
    }
}

export default Matches;