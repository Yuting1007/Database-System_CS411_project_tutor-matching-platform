import React, { Component } from 'react';
import NavBar from './NavBar';
import Settings from './Settings';
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";
import '../css/Start.css'

class Start extends Component {
    constructor(props) {
        super(props);

        sessionStorage.setItem('userID', '1234')
        this.state = {
            toSettings: false,
            isRegiModalOpen: false,
            isLoginModalOpen: false,
            regi_name: '',
            regi_age: 0,
            regi_location: ''
        };

        this.toggleRegiModal = this.toggleRegiModal.bind();
        this.toggleLoginModal = this.toggleLoginModal.bind();
        this.onRegiFormSubmit = this.onRegiFormSubmit.bind();
        this.handleRegiChange = this.handleRegiChange.bind();

    }

    //// EXAMPLE for how to switch pages programatically (as opposed to nav bar way)
    // handleClick = () => {
    //   this.props.history.push('/settings')
    // }
    
    // function that toggles the status of the modal for registration
    toggleRegiModal = () => {
      this.setState({
        isRegiModalOpen: !this.state.isRegiModalOpen
      })
    };

    // function that toggles the status of the modal for login
    toggleLoginModal = () => {
      this.setState({
        isLoginModalOpen: !this.state.isLoginModalOpen
      })
    };

    onRegiFormSubmit = (e) => {
      e.preventDefault();
       let formResults = {
        name: this.state.regi_name,
        age: this.state.regi_age,
        location: this.state.regi_location
       }
      console.log(formResults)
         // not correct syntax i dont think
      //  database.push(formResults);
       this.setState({
        name: '',
        age: 0,
        location: ''
       })
    };

    handleRegiChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    
    
    render() {
      
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome to eduFY</h1>
                                <p>

                                <Button
                                  tag="a"
                                  color="info"
                                  size="large"
                                  target="_blank"
                                  className="start-buttons"
                                  onClick={this.toggleRegiModal}
                                >
                                  Sign up!
                                </Button>

                                <Modal isOpen={this.state.isRegiModalOpen} toggle={this.toggleRegiModal} >
                                  <ModalHeader toggle={this.toggleRegiModal}>Register for eduFY!</ModalHeader>
                                  <ModalBody>
                                      <Form onSubmit={this.onRegiFormSubmit}>
                                        <FormGroup>
                                          <Label for="regi-name">Name</Label>
                                          <Input type="text" name="regi_name" id="regi-name" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="regi-age">Age</Label>
                                          <Input type="number" name="regi_age" min="1" id="regi-age" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="regi-loc">Location</Label>
                                          <Input type="text" name="regi_location" id="regi-loc" placeholder="Any level of detail will work (city, area on campus, etc.)" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup tag="fieldset">
                                          <legend>Account Type (incomplete)</legend>
                                          <FormGroup check>
                                            <Label check>
                                              <Input type="radio" name="radio1" />{' '}
                                              Student
                                            </Label>
                                          </FormGroup>
                                          <FormGroup check>
                                            <Label check>
                                              <Input type="radio" name="radio1" />{' '}
                                              Tutor
                                            </Label>
                                          </FormGroup>
                                        </FormGroup>
                                        <Button type="submit">Submit</Button>
                                      </Form>
                                  </ModalBody>
                                  <ModalFooter>
                                    {/* <Button color="primary" onClick={this.toggleRegiModal}>Do Something</Button>{' '} */}
                                    <Button color="secondary" onClick={this.toggleRegiModal}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                                    
                                    
                                  
                                <Button
                                    tag="a"
                                    color="success"
                                    size="large"
                                    target="_blank"
                                    onClick={this.toggleLoginModal}
                                    className="start-buttons"
                                >
                                    Login
                                </Button>

                                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal} >
                                  <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                                  <ModalBody>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color="primary" onClick={this.toggleLoginModal}>Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleLoginModal}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                                     
                                    
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Start;