import React, { Component } from 'react';
//import NavBar from './NavBar';
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
import '../css/Start.css';
import '../css/Logo.css';
import Users from './Users';
//import { response } from 'express';
var passwordHash = require('password-hash');


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
            student_regi_pnum:'',
            student_regi_email:'',
            student_regi_password:'',
            student_regi_major:'',
            student_regi_edu_level: '',

            //tutor register info
            tutor_regi_name:'',
            tutor_regi_age:'',
            tutor_regi_location:'',
            tutor_regi_gender:'',
            tutor_regi_edu_level:'',
            tutor_regi_grade:'',
            tutor_regi_major:'',
            tutor_regi_pnum:'',
            tutor_regi_email:'',
            tutor_regi_password:'',


            userID:'',
            s_name:'',
            userPassword:'',

            //redirect states
            redirect_home_link: "/student/home",
            redirect_student_home: false,

            redirect_tutor_home: false,
            redirect_tutor_link: '/tutor/home',

            //form filling errors
            error_message:'',
            isRegiErrorModalOpen:false,

            //acknowledgement
            isSuccessfulRegiModalOpen: false,
            newID:''
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

        this.toggleRegiErrorModal = this.toggleRegiErrorModal.bind();
        this.toggleSuccessfulRegiModal = this.toggleSuccessfulRegiModal.bind();
        

    }

    toggleSuccessfulRegiModal = () => {
      this.setState({
        isSuccessfulRegiModalOpen: !this.state.isSuccessfulRegiModalOpen
      })
    }

    toggleRegiErrorModal = () => {
      this.setState({
        isRegiErrorModalOpen: !this.state.isRegiErrorModalOpen
      })
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
        gender: this.state.student_regi_gender,
        email: this.state.student_regi_email,
        pnum: this.state.student_regi_pnum,
        major: this.state.student_regi_major.toLowerCase(),
        edu_level: this.state.student_regi_edu_level,
        

        rawPassowrd: this.state.student_regi_password,
        hashedPassword: passwordHash.generate(this.state.student_regi_password)
       }
      console.log(formResults)

      //check for error in the form
      if (formResults.name === '') {
        this.state.error_message = 'Name field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.age === '' || parseInt(formResults.age) <= 0) {
        this.state.error_message = 'Invalid Age!'
        this.toggleRegiErrorModal()
      }  else if(formResults.major === ''){
          this.state.error_message = 'Major field cannot be empty!'
          this.toggleRegiErrorModal()
      }
      else if(formResults.gender === ''){
        this.state.error_message = 'Gender field cannot be empty!'
        this.toggleRegiErrorModal()
    }
        else if(formResults.edu_level === ''){
          this.state.error_message = "Choose education level from dropdown!"
          this.toggleRegiErrorModal()
        }
      else if (formResults.location === '') {
        this.state.error_message = 'Location field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.email === '') {
        this.state.error_message = 'Email field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.pnum === '') {
        this.state.error_message = 'Phone Number field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.rawPassowrd === '') {
        this.state.error_message = 'Password field cannot be empty!'
        this.toggleRegiErrorModal()
      } else {
      //POST req here
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
      };
      this.state.userPassword = formResults.rawPassowrd
      fetch('/start/student-create', requestOptions)
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(results => {
        console.log(results.insertId);

        console.log("call login with param " + results.insertId)
        this.state.newID = results.insertId
        this.login(results.insertId)

        this.toggleSuccessfulRegiModal()
      });

      this.setState({
        name: '',
        age: 0,
        location: ''
       })
       this.toggleStudentRegiModal();
       this.toggleChoosingModal();
      }
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
        major: this.state.tutor_regi_major.toLowerCase(),
        email: this.state.tutor_regi_email,
        pnum: this.state.tutor_regi_pnum,

        //password after hashing
        rawPassowrd: this.state.tutor_regi_password,
        hashedPassword: passwordHash.generate(this.state.tutor_regi_password)
       }
      console.log(formResults)

      

       //check for error in the form
       if (formResults.name === '') {
        this.state.error_message = 'Name field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.age === '' || parseInt(formResults.age) <= 0) {
        this.state.error_message = 'Invalid Age!'
        this.toggleRegiErrorModal()
      }  else if (formResults.location === '') {
        this.state.error_message = 'Location field cannot be empty!'
        this.toggleRegiErrorModal()
      }  else if (formResults.major === '') {   
        this.state.error_message = 'Major field cannot be empty!'
        this.toggleRegiErrorModal()
      }  else if (formResults.edu_level === '') {
        this.state.error_message = 'Choose education level from dropdown!'
        this.toggleRegiErrorModal()
      }
      else if (formResults.grade === '') {
        this.state.error_message = 'Choose grade from dropdown!'
        this.toggleRegiErrorModal()
      }
      else if(formResults.gender === ''){
        this.state.error_message = 'Choose gender from dropdrown!'
        this.toggleRegiErrorModal()
      }
      else if (formResults.pnum === '') {
        this.state.error_message = 'Phone number field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.email === '') {
        this.state.error_message = 'Email field cannot be empty!'
        this.toggleRegiErrorModal()
      } else if (formResults.rawPassowrd === '') {
        this.state.error_message = 'Password field cannot be empty!'
        this.toggleRegiErrorModal()
      } else {
        //POST req here
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({formResults})
        };
        this.state.userPassword = formResults.rawPassowrd;
        fetch('/start/tutor-create', requestOptions)
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(results => {
          console.log(results.insertId);
  
          console.log("call login with param " + results.insertId)
          this.state.newID = results.insertId
          this.tutorLogin(results.insertId)
  
          this.toggleSuccessfulRegiModal()
        });
        
        this.setState({
          name: '',
          age: 0,
          location: ''
        })
        this.toggleTutorRegiModal();
        this.toggleChoosingModal();
      }
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
        } else if (!passwordHash.verify(this.state.userPassword, data[0].s_password)) {
          console.log("wrong student pass")
          if (this.state.isLoginRejectOpen === false) {
            this.toogleLoginRejectModal()
          }
          this.toggleLoginModal()
        }
         else {

          //store studenet info into session storage
          sessionStorage.setItem('s_id', data[0].s_id);
          sessionStorage.setItem('s_name', data[0].s_name);
          sessionStorage.setItem('s_age', data[0].s_age);
          sessionStorage.setItem('s_location', data[0].s_location);
          sessionStorage.setItem('s_gender', data[0].s_gender);
          sessionStorage.setItem('s_ratings', data[0].s_ratings);
          sessionStorage.setItem('s_pnum', data[0].s_pnum);
          sessionStorage.setItem('s_email', data[0].s_email);
          sessionStorage.setItem('s_password', data[0].s_password);
          sessionStorage.setItem('s_rawpassword', this.state.student_regi_password);
          sessionStorage.setItem('s_edu_level', data[0].s_edu_level);
          sessionStorage.setItem('s_major', data[0].s_major.toLowerCase());
        

          sessionStorage.setItem('account_type', 'student');    

          //user preference (students to tutors)
          sessionStorage.setItem('preference_gender', data[0].preference_gender);  
          sessionStorage.setItem('preference_major', data[0].preference_major);  
          sessionStorage.setItem('preference_edu_level', data[0].preference_edu_level);  
          sessionStorage.setItem('preference_pastEx', data[0].preference_pastEx);  

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
      let formResults = {
        id: this.state.userID,
        password: this.state.userPassword
      }
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
          if (this.state.isTutorLoginRejectOpen === false) {
            this.toggleTutorLoginRejectModal()
          }
          this.toggleTutorLoginModal()
        } else if (!passwordHash.verify(this.state.userPassword, data[0].t_password)) {
          console.log("wrong pass");
          if (this.state.isTutorLoginRejectOpen === false) {
            this.toggleTutorLoginRejectModal()
          }
          this.toggleTutorLoginModal()
        } else {

          //store tutor info into session storage
          sessionStorage.setItem('t_id', data[0].t_id);
          sessionStorage.setItem('t_name', data[0].t_name);
          sessionStorage.setItem('t_age', data[0].t_age);
          sessionStorage.setItem('t_location', data[0].t_location);
          sessionStorage.setItem('t_gender', data[0].t_gender);
          sessionStorage.setItem('t_ratings', data[0].t_ratings);
          sessionStorage.setItem('t_major', data[0].t_major.toLowerCase());
          sessionStorage.setItem('t_edu_level', data[0].t_edu_level);
          sessionStorage.setItem('t_grade', data[0].t_grade);
          sessionStorage.setItem('t_email', data[0].t_email);
          sessionStorage.setItem('t_pnum', data[0].t_pnum);
          sessionStorage.setItem('t_password', data[0].t_password);    
               
          sessionStorage.setItem('account_type', "tutor");    


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


    // function to get student's current matches
  //   getMatches = () => {
  //     let tutorIds = [];
  //     console.log("getting matches");
  //     let url = '/matches/show-tutor-matches/' + this.state.userID
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(matches => {
      
  //     for (let x of matches) {
  //         tutorIds.push(x['t_id'])
  //     }
  //     //console.log('tutor ids: ' + tutorIds);
  //     let myTutorMatches = []
  //     for (let id of tutorIds)  {
  //         for (let x of this.state.tutors) {
  //             if (x['t_id'] == id) {
  //                 myTutorMatches.push(x);
  //                 break;
  //             }
  //         }
  //     }
  //     //console.log('tutor matches here: ' + myTutorMatches)
  //     //now remove duplicates
  //     let uniqueTutors = new Set(myTutorMatches);
  //     let uniqueTutorMatches = [...uniqueTutors];
  //     //console.log('unique tutors: ' + uniqueTutorMatches)
  //     sessionStorage.setItem('current_matches', JSON.stringify(uniqueTutorMatches))
  //   })
  // }


  
    render() {
      if (this.state.redirect_student_home) {
        return <Redirect to={this.state.redirect_home_link} />
      } else if (this.state.redirect_tutor_home) {
        return <Redirect to={this.state.redirect_tutor_link} />
      }
      
        return (
            <div className='start-background'>
                <Jumbotron className='logo-jumbo'>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className='welcome-text'>eduFY {this.state.s_name} </h1>
                                <p>

                                <Modal isOpen={this.state.isChoosingLoginOpen} toggle={this.toggleChoosingLoginModal} >
                                <ModalHeader toggle={this.toggleChoosingLoginModal}>Login as </ModalHeader>
                                  <ModalBody>
                                      <Button className='sign-up-button'  onClick={this.toggleLoginModal} type="submit">eduFY Student</Button> {' '}
                                      <Button className='login-button'  onClick={this.toggleTutorLoginModal}>eduFY Tutor</Button>
                                  </ModalBody>
                                </Modal>


                                <Modal isOpen={this.state.isChoosingOpen} toggle={this.toggleChoosingModal} >
                                <ModalHeader toggle={this.toggleChoosingModal}>Sign up as  </ModalHeader>
                                  <ModalBody>
                                      <Button className='sign-up-button' onClick={this.toggleStudentRegiModal} type="submit">eduFY Student</Button> {' '}
                                      <Button className='login-button' onClick={this.toggleTutorRegiModal}>eduFY Tutor</Button>
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
                                          <Input type="select" name="student_regi_gender" id="student_regi_gender" onChange={e => this.handleRegiChange(e)}>
                                        <option></option>
                                        <option>None</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Input>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-edu-level">Education Level</Label>
                                          <Input type="select" name="student_regi_edu_level" id="student_regi_edu_level" onChange={e => this.handleRegiChange(e)}>
                                        <option></option>
                                        <option>Elementary School</option>
                                        <option>Middle School</option>
                                        <option>High School</option>
                                        <option>College</option>
                                        <option>Master</option>
                                        <option>PHD</option>
                                    </Input>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-major">Major</Label>
                                          <Input type="text" name="student_regi_major" id="student_regi-major"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-pnum">Phone Number</Label>
                                          <Input type="text" name="student_regi_pnum" id="student_regi-pnum"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-email">Email</Label>
                                          <Input type="text" name="student_regi_email" id="student_regi-email"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="student_regi-password">Password</Label>
                                          <Input type="text" name="student_regi_password" id="student_regi-password"  onChange={e => this.handleRegiChange(e)} />
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
                                          <Input type="select" name="tutor_regi_gender" id="tutor_regi_gender" onChange={e => this.handleRegiChange(e)}>
                                            <option></option>
                                        <option>None</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Input>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-edu_level">Education Level</Label>
                                          <Input type="select" name="tutor_regi_edu_level" id="tutor_regi_edu_level" onChange={e => this.handleRegiChange(e)}>
                                          <option></option>
                                          <option value="Elementary School">Elementary School</option>
                                          <option value="Middle School">Middle School</option>
                                          <option value="High School">High School</option>
                                          <option value="College">College</option>
                                          <option value="Master">Master</option>
                                          <option value="PHD">PHD</option>
                                          </Input>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-grade">Your average grade</Label>
                                          <Input type="select" name="tutor_regi_grade" id="tutor_regi_grade" onChange={e => this.handleRegiChange(e)}>
                                            <option></option>
                                          <option value="0-2">0-2 </option>
                                          <option value="2.5-3">2.5-3</option>
                                          <option value="3-3.3">3-3.3</option>
                                          <option value="3.3-3.6">3.3-3.6</option>
                                          <option value="3.6-3.9">3.6-3.9</option>
                                          <option value="3.9-4">3.9-4</option>
                                          </Input>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-major">Major/Profession</Label>
                                          <Input type="text" name="tutor_regi_major" id="tutor_regi-major"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-pnum">Phone Number</Label>
                                          <Input type="text" name="tutor_regi_pnum" id="tutor_regi-pnum"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-email">Email</Label>
                                          <Input type="text" name="tutor_regi_email" id="tutor_regi-email"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="tutor_regi-password">Password</Label>
                                          <Input type="text" name="tutor_regi_password" id="tutor_regi-password"  onChange={e => this.handleRegiChange(e)} />
                                        </FormGroup>
                                        <Button type="submit">Submit</Button>
                                      </Form>
                                  </ModalBody>
                                  <ModalFooter>
                                    {/* <Button color="primary" onClick={this.toggleRegiModal}>Do Something</Button>{' '} */}
                                    <Button color="secondary" onClick={this.toggleTutorRegiModal}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                                    
                                    
                                  
                                {/* <Button
                                    tag="a"
                                    size="large"
                                    target="_blank"
                                    onClick={this.toggleChoosingLoginModal}
                                    className="login-button"
                                >
                                    Login
                                </Button> */}

                                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal} >
                                  <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onLoginFormSubmit}>
                                      <FormGroup>
                                        <Label for="userID">Please enter your student ID</Label>
                                        <Input type="text" name="userID" id="userID" onChange={e => this.handleLoginChange(e)} />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="userPassword">Please enter your password</Label>
                                        <Input type="text" name="userPassword" id="userPassword" onChange={e => this.handleLoginChange(e)} />
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
                                      <FormGroup>
                                        <Label for="userPassword">Please enter your password</Label>
                                        <Input type="text" name="userPassword" id="userPassword" onChange={e => this.handleLoginChange(e)} />
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
                                    Sorry, the ID and password you entered do not match. Please try again!
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
                                    Sorry, the ID and password you entered do not match. Please try again!
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

                                <Modal isOpen={this.state.isRegiErrorModalOpen} toggle={this.toggleRegiErrorModal}>
                                  <ModalHeader toggle={this.toggleRegiErrorModal}>Invalid Information</ModalHeader>
                                  <ModalBody>
                                    {this.state.error_message}
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleRegiErrorModal}
                                        >Fix It
                                      </Button>
                                  </ModalFooter>
                                </Modal>

                                <Modal isOpen={this.state.isSuccessfulRegiModalOpen} toggle={this.toggleSuccessfulRegiModal}>
                                  <ModalHeader toggle={this.toggleSuccessfulRegiModal}>Your account has been created!</ModalHeader>
                                  <ModalBody>
                                    Your ID is {this.state.newID}  {'. '}
                                    Please record it as you will need it to login in the future.
                                    You will be redirected to your account homepage.  
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleSuccessfulRegiModal}
                                        >Let's go!
                                      </Button>
                                  </ModalFooter>
                                </Modal>
                                     
                                    
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <div className='button-div'>
                <Jumbotron>
        <h4 className="display-3">Welcome to eduFY!</h4>
        <p className="lead">Our goal is to provide students and tutors with a platform to match and find the best possible relationship. We help provide a way for students to browse and evaluate potential tutors based on their educational needs.</p>
        <hr className="my-2" />
        
        <Row className='button-row'>
                    <Button
                      tag="a"
                      size="large"
                      target="_blank"
                      className="sign-up-button"
                      onClick={this.toggleChoosingModal}
                    >
                      Sign up!
                    </Button>

                    <Button
                        tag="a"
                        size="large"
                        target="_blank"
                        onClick={this.toggleChoosingLoginModal}
                        className="login-button"
                    >
                        Login
                    </Button>
                  </Row>
      </Jumbotron>
                  
                  
                </div>


            </div>
        );
    }
}

export default Start;


