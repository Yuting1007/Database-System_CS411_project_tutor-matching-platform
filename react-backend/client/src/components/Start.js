import React, { Component } from 'react';
import NavBar from './NavBar';
import Settings from './Settings';
import Student_Home from './Home'
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
            isStudentRegiModalOpen: false,
            isTutorRegiModalOpen: false,
            isLoginModalOpen: false,
            isTutorLoginModalOpen: false,
            isLoginRejectOpen: false,
            isTutorLoginRejectOpen: false,
            isChoosingOpen: false,
            isChoosingLoginOpen: false,
            student_regi_name: '',
            student_regi_age: 0,
            student_regi_location: '',
            student_regi_gender:'',

            //tutor register info
            tutor_regi_name:'',
            tutor_regi_age:'',
            tutor_regi_location:'',
            tutor_regi_gender:'',
            tutor_regi_edu_level:'',
            tutor_regi_grade:'',
            tutor_regi_major:'',
            userID:'',
            s_name:'',

            //redirect states
            redirect_home_link: "/student/home",
            redirect_student_home: false,

            redirect_tutor_home: false,
            redirect_tutor_link: '/tutor/home'
        };

        this.toggleStudentRegiModal = this.toggleStudentRegiModal.bind();
        this.toggleTutorRegiModal = this.toggleTutorRegiModal.bind();
        this.toggleLoginModal = this.toggleLoginModal.bind();
        this.onRegiFormSubmit = this.onRegiFormSubmit.bind();
        this.handleRegiChange = this.handleRegiChange.bind();

        this.toogleLoginRejectModal = this.toogleLoginRejectModal.bind();
        this.toggleChoosingModal = this.toggleChoosingModal.bind();
        this.toggleChoosingLoginModal = this.toggleChoosingLoginModal.bind();
        this.toggleTutorLoginModal = this.toggleTutorLoginModal.bind();
        this.toggleTutorLoginRejectModal = this.toggleTutorLoginRejectModal.bind();
        

    }

    toggleTutorLoginRejectModal = () => {
      this.setState({
        isTutorLoginRejectOpen: !this.state.isTutorLoginRejectOpen
      })
    }

    toggleTutorLoginModal = () => {
      this.setState({
        isTutorLoginModalOpen: !this.state.isTutorLoginModalOpen
      })
    }

    toggleChoosingLoginModal = () => {
      this.setState({
        isChoosingLoginOpen: !this.state.isChoosingLoginOpen
      })
    }

    toggleChoosingModal = () => {
      this.setState({
        isChoosingOpen: !this.state.isChoosingOpen
      })
    }

    //// EXAMPLE for how to switch pages programatically (as opposed to nav bar way)
    // handleClick = () => {
    //   this.props.history.push('/settings')
    // }
    
    // function that toggles the status of the modal for registration
    toggleStudentRegiModal = () => {
      this.setState({
        isStudentRegiModalOpen: !this.state.isStudentRegiModalOpen
      })
    };

    toggleTutorRegiModal = () => {
      this.setState({
        isTutorRegiModalOpen: !this.state.isTutorRegiModalOpen
      })
    }

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
        name: this.state.student_regi_name,
        age: this.state.student_regi_age,
        location: this.state.student_regi_location,
        gender: this.state.student_regi_gender
       }
      console.log(formResults)
       
      //POST req here
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
      };
      fetch('/start/student-create', requestOptions)
        
       this.setState({
        name: '',
        age: 0,
        location: ''
       })
       this.toggleStudentRegiModal();
       this.toggleChoosingModal();
    };

    onTutorRegiFormSubmit = (e) => {
      e.preventDefault();
       let formResults = {
        name: this.state.tutor_regi_name,
        age: this.state.tutor_regi_age,
        location: this.state.tutor_regi_location,
        gender: this.state.tutor_regi_gender,
        grade: this.state.tutor_regi_grade,
        edu_level: this.state.tutor_regi_edu_level,
        major: this.state.tutor_regi_major
       }
      console.log(formResults)
       
      //POST req here
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
      };
      fetch('/start/tutor-create', requestOptions)
        
       this.setState({
        name: '',
        age: 0,
        location: ''
       })
      this.toggleTutorRegiModal();
      this.toggleChoosingModal();
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
          sessionStorage.setItem('s_id', data[0].s_id);
          sessionStorage.setItem('s_name', data[0].s_name);
          sessionStorage.setItem('s_age', data[0].s_age);
          sessionStorage.setItem('s_location', data[0].s_location);
          sessionStorage.setItem('s_gender', data[0].s_gender);
          sessionStorage.setItem('s_ratings', data[0].s_ratings);

          console.log(sessionStorage.getItem('s_name'));

          this.state.redirect_student_home = true;

          if (this.state.isLoginModalOpen === true) {
            this.toggleLoginModal();
          }
          if (this.state.isLoginRejectOpen === true) {
            this.toogleLoginRejectModal();
          }

          
        }
      });
    }

    onTutorLoginFormSubmit = (e) => {
      e.preventDefault();
      let id = this.state.userID
      this.tutorLogin(id)
    };

    tutorLogin = (id) =>{
      let url = '/start/tutor/' + id
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
          sessionStorage.setItem('t_id', data[0].t_id);
          sessionStorage.setItem('t_name', data[0].t_name);
          sessionStorage.setItem('t_age', data[0].t_age);
          sessionStorage.setItem('t_location', data[0].t_location);
          sessionStorage.setItem('t_gender', data[0].t_gender);
          sessionStorage.setItem('t_ratings', data[0].t_ratings);
          sessionStorage.setItem('t_major', data[0].t_major);
          sessionStorage.setItem('t_edu_level', data[0].t_edu_level);
          sessionStorage.setItem('t_grade', data[0].t_grade);


          console.log(sessionStorage.getItem('t_name'));

          this.state.redirect_tutor_home = true;

          if (this.state.isTutorLoginModalOpen === true) {
            this.toggleTutorLoginModal();
          }
          if (this.state.isTutorLoginRejectOpen === true) {
            this.toggleTutorLoginRejectModal();
          }
        }
      });
    }


  
    render() {
      if (this.state.redirect_student_home) {
        return <Redirect to={this.state.redirect_home_link} />
      } else if (this.state.redirect_tutor_home) {
        return <Redirect to={this.state.redirect_tutor_link} />
      }
      
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
                                  onClick={this.toggleChoosingModal}
                                >
                                  Sign up!
                                </Button>

                                <Modal isOpen={this.state.isChoosingLoginOpen} toggle={this.toggleChoosingLoginModal} >
                                <ModalHeader toggle={this.toggleChoosingLoginModal}>Login as </ModalHeader>
                                  <ModalBody>
                                      <Button color="primary" onClick={this.toggleLoginModal} type="submit">Student</Button> {' '}
                                      <Button color="primary" onClick={this.toggleTutorLoginModal}>Tutor</Button>
                                  </ModalBody>
                                </Modal>


                                <Modal isOpen={this.state.isChoosingOpen} toggle={this.toggleChoosingModal} >
                                  <ModalBody>
                                      <Button color="primary" onClick={this.toggleStudentRegiModal} type="submit">Student</Button> {' '}
                                      <Button color="primary" onClick={this.toggleTutorRegiModal}>Tutor</Button>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isStudentRegiModalOpen} toggle={this.toggleStudentRegiModal} >
                                  <ModalHeader toggle={this.toggleStudentRegiModal}>Register for eduFY as a student! </ModalHeader>
                                  <ModalBody>
                                      <Form onSubmit={this.onRegiFormSubmit}>
                                        <FormGroup>
                                          <Label for="student_regi-name">Name</Label>
                                          <Input type="text" name="student_regi_name" id="student_regi-name" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-age">Age</Label>
                                          <Input type="number" name="student_regi_age" min="1" id="student_regi-age" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-loc">Location</Label>
                                          <Input type="text" name="student_regi_location" id="student_regi-loc" placeholder="Any level of detail will work (city, area on campus, etc.)" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-gender">Gender</Label>
                                          <Input type="text" name="student_regi_gender" id="student_regi-gender"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <Button type="submit">Submit</Button>
                                      </Form>
                                  </ModalBody>
                                  <ModalFooter>
                                    {/* <Button color="primary" onClick={this.toggleRegiModal}>Do Something</Button>{' '} */}
                                    <Button color="secondary" onClick={this.toggleStudentRegiModal}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>


                                <Modal isOpen={this.state.isTutorRegiModalOpen} toggle={this.toggleTutorRegiModal} >
                                  <ModalHeader toggle={this.toggleTutorRegiModal}>Register for eduFY as a Tutor! </ModalHeader>
                                  <ModalBody>
                                      <Form onSubmit={this.onTutorRegiFormSubmit}>
                                        <FormGroup>
                                          <Label for="tutor_regi-name">Name</Label>
                                          <Input type="text" name="tutor_regi_name" id="tutor_regi-name" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-age">Age</Label>
                                          <Input type="number" name="tutor_regi_age" min="1" id="tutor_regi-age" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-loc">Location</Label>
                                          <Input type="text" name="tutor_regi_location" id="tutor_regi-loc" placeholder="Any level of detail will work (city, area on campus, etc.)" onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-gender">Gender</Label>
                                          <Input type="text" name="tutor_regi_gender" id="tutor_regi-gender"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-edu_level">Education Level</Label>
                                          <Input type="text" name="tutor_regi_edu_level" id="tutor_regi-edu_level"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-grade">Your average grade</Label>
                                          <Input type="text" name="tutor_regi_grade" id="tutor_regi-grade"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-major">Major/Profession</Label>
                                          <Input type="text" name="tutor_regi_major" id="tutor_regi-major"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <Button type="submit">Submit</Button>
                                      </Form>
                                  </ModalBody>
                                  <ModalFooter>
                                    {/* <Button color="primary" onClick={this.toggleRegiModal}>Do Something</Button>{' '} */}
                                    <Button color="secondary" onClick={this.toggleTutorRegiModal}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                                    
                                    
                                  
                                <Button
                                    tag="a"
                                    color="success"
                                    size="large"
                                    target="_blank"
                                    onClick={this.toggleChoosingLoginModal}
                                    className="start-buttons"
                                >
                                    Login
                                </Button>

                                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal} >
                                  <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onLoginFormSubmit}>
                                      <FormGroup>
                                        <Label for="userID">Please enter your student ID</Label>
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

                                <Modal isOpen={this.state.isTutorLoginModalOpen} toggle={this.toggleTutorLoginModal} >
                                  <ModalHeader toggle={this.toggleTutorLoginModal}>Login</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onTutorLoginFormSubmit}>
                                      <FormGroup>
                                        <Label for="userID">Please enter your tutor ID</Label>
                                        <Input type="text" name="userID" id="userID" onChange={e => this.handleLoginChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Login</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleTutorLoginModal}>Cancel</Button>
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

                                <Modal isOpen={this.state.isTutorLoginRejectOpen} toggle={this.toggleTutorLoginRejectModal}>
                                  <ModalHeader toggle={this.toggleTutorLoginRejectModal}>Login Fail</ModalHeader>
                                  <ModalBody>
                                    Sorry, the tutor ID you entered is not valid. Please try again!
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button color="primary" onClick={this.toggleTutorLoginModal}>
                                        Try again
                                      </Button>
                                      <Button 
                                        color="secondary" 
                                        onClick={this.toggleTutorLoginRejectModal}
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