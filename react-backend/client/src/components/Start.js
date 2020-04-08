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
import Users from './Users';
//import { response } from 'express';

class Start extends Component {
    constructor(props) {
        super(props);


        //sessionStorage.setItem('userID', '1234')

        this.state = {
            toSettings: false,
            isRegiModalOpen: false,
            isLoginModalOpen: false,
            isLoginRejectOpen: false,
            regi_name: '',
            regi_age: 0,
            regi_location: '',
            userID:'',
            s_name:''
        };

        this.toggleRegiModal = this.toggleRegiModal.bind();
        this.toggleLoginModal = this.toggleLoginModal.bind();
        this.onRegiFormSubmit = this.onRegiFormSubmit.bind();
        this.handleRegiChange = this.handleRegiChange.bind();

        this.toogleLoginRejectModal = this.toogleLoginRejectModal.bind();
        

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

    // function that toggles the status of the modal for login reject
    toogleLoginRejectModal = () => {
      this.setState({
        isLoginRejectOpen: !this.state.isLoginRejectOpen
      })
    }

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
      
      //POST req here
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
      };
      fetch('/start/student-create', requestOptions)
        // .then(response => response.json())
        // .then(data => console.log('POST response: ' + data));



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


    //login functions ===================================================
    onLoginFormSubmit = (e) => {
      e.preventDefault();
      let id = this.state.userID
      this.login(id)
    };

    handleLoginChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }


    login = (id) =>{
      let url = '/start/student/' + id
      fetch(url)
      .then(res => res.json())

      //need to catch error somehow
      
      .then(data => {
        console.log("reach this point")
        console.log(data)
        if (data.length === 0) {
          if (this.state.isLoginRejectOpen === false) {
            this.toogleLoginRejectModal()
          }
          this.toggleLoginModal()
        } else {

          //store studenet info into local storage
          localStorage.setItem('s_id', data[0].s_id);
          localStorage.setItem('s_name', data[0].s_name);
          localStorage.setItem('s_age', data[0].s_age);
          localStorage.setItem('s_location', data[0].s_location);
          localStorage.setItem('s_gender', data[0].s_gender);
          localStorage.setItem('s_rating', data[0].s_ratings);

          console.log(localStorage.getItem('s_name'));
          this.state.s_name = ", " + localStorage.getItem('s_name') + "!"

          if (this.state.isLoginModalOpen === true) {
            this.toggleLoginModal();
          }
          if (this.state.isLoginRejectOpen === true) {
            this.toogleLoginRejectModal();
          }
        }
      });
    }

  
    render() {
      
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome to eduFY {this.state.s_name} </h1>
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
                                  <ModalHeader toggle={this.toggleRegiModal}>Register for eduFY! </ModalHeader>
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
                                    <Form onSubmit={this.onLoginFormSubmit}>
                                      <FormGroup>
                                        <Label for="userID">Enter your userID</Label>
                                        <Input type="text" name="userID" id="userID" onChange={e => this.handleLoginChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Login</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleLoginModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>

                                  <ModalFooter>
                                      Forgot your userID? Well, idk what to do...
                                  </ModalFooter>

                                  
                                </Modal>

                                <Modal isOpen={this.state.isLoginRejectOpen} toggle={this.toogleLoginRejectModal}>
                                  <ModalHeader toggle={this.toogleLoginRejectModal}>Login Fail</ModalHeader>
                                  <ModalBody>
                                    Sorry, the userID you entered is not valid. Please try again!
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button color="primary" onClick={this.toggleLoginModal}>
                                        Try again
                                      </Button>
                                      <Button 
                                        color="secondary" 
                                        onClick={this.toogleLoginRejectModal}
                                        >Cancel
                                      </Button>
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