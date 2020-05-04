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
    Modal,
    ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
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
import NewNavBar from './NewNavBar';
import '../css/Logo.css';
var passwordHash = require('password-hash');


class TutorSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditNameModalOpen:false,
            isEditAgeModalOpen:false,
            isEditLocationModalOpen:false,
            isEditGenderModalOpen:false,
            isEditEduLevelModalOpen: false,
            isEditGradeModalOpen: false,
            isEditMajorModalOpen: false,
            isEditEmailModalOpen: false,
            isEditPnumModalOpen: false,
            isDeleteConfirmModalOpen: false,
            isLogoutConfirmModalOpen: false,
            isEditPasswordOpen: false,
            isEditPasswordFailureOpen: false,
            isEditPassWordSuccessOpen: false,
            old_password: ' ',
            new_password: ' ',
            Hash: ' ',
            

            //tutor info
            t_id: sessionStorage.getItem('t_id'),
            t_name: sessionStorage.getItem('t_name'),
            t_age: sessionStorage.getItem('t_age'),
            t_location: sessionStorage.getItem('t_location'),
            t_gender: sessionStorage.getItem('t_gender'),
            t_ratings: sessionStorage.getItem('t_ratings'),
            t_grade: sessionStorage.getItem('t_grade'),
            t_major: sessionStorage.getItem('t_major'),
            t_edu_level: sessionStorage.getItem('t_edu_level'),
            t_email: sessionStorage.getItem('t_email'),
            t_pnum: sessionStorage.getItem('t_pnum'),
            t_password: sessionStorage.getItem('t_password'),
            
            

            //updated info
            updated_name:'',
            updated_age:'',
            updated_location:'',
            updated_gender:'', 
            updated_grade:'',
            updated_edu_level:'',
            updated_major:'',
            updated_grade:'',
            updated_major:'',
            updated_edu_level:'',
            updated_pnum:'',
            updated_email:'',

            //redirect states
            redirect_start_link: "/",
            redirect_start: false
        };

        this.toggleEditNameModal = this.toggleEditNameModal.bind();
        this.toggleEditAgeModal = this.toggleEditAgeModal.bind();
        this.toggleEditLocationModal = this.toggleEditLocationModal.bind();
        this.toggleEditGenderModal = this.toggleEditGenderModal.bind();
        this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind();
        this.toggleLogoutConfirmModal = this.toggleLogoutConfirmModal.bind();
        this.toggleEditEduLevelModal = this.toggleEditEduLevelModal.bind();
        this.toggleEditGradeModal = this.toggleEditGradeModal.bind();
        this.toggleEditMajorModal = this.toggleEditMajorModal.bind();
        this.toggleEditEmailModal = this.toggleEditEmailModal.bind();
        this.toggleEditPnumModal = this.toggleEditPnumModal.bind();
        this.toggleEditPassword = this.toggleEditPassword.bind();
        this.EditPasswordFailure = this.EditPasswordFailure.bind();
        this.EditPasswordSuccess = this.EditPasswordSuccess.bind();
       
    }

    toggleLogoutConfirmModal = () => {
        this.setState({
            isLogoutConfirmModalOpen: !this.state.isLogoutConfirmModalOpen
        })
    }

    toggleEditPnumModal = () => {
        this.setState({
            isEditPnumModalOpen: !this.state.isEditPnumModalOpen
          })
    }

    toggleEditEmailModal = () => {
        this.setState({
            isEditEmailModalOpen: !this.state.isEditEmailModalOpen
          })
    }

    toggleEditMajorModal = () => {
        this.setState({
            isEditMajorModalOpen: !this.state.isEditMajorModalOpen
          })
    }

    toggleEditGradeModal = () => {
        this.setState({
            isEditGradeModalOpen: !this.state.isEditGradeModalOpen
          })
    }

    toggleEditEduLevelModal = () => {
        this.setState({
            isEditEduLevelModalOpen: !this.state.isEditEduLevelModalOpen
          })
    }

    toggleDeleteConfirmModal = () => {
        this.setState({
            isDeleteConfirmModalOpen: !this.state.isDeleteConfirmModalOpen
          })
    }

    toggleEditNameModal = () => {
        this.setState({
            isEditNameModalOpen: !this.state.isEditNameModalOpen
          })
    };

    toggleEditAgeModal = () => {
        this.setState({
            isEditAgeModalOpen: !this.state.isEditAgeModalOpen
          })
    };

    toggleEditLocationModal = () => {
        this.setState({
            isEditLocationModalOpen: !this.state.isEditLocationModalOpen
          })
    };

    toggleEditGenderModal = () => {
        this.setState({
            isEditGenderModalOpen: !this.state.isEditGenderModalOpen
          })
    };

    toggleEditPassword = () => {
        this.setState({
            isEditPasswordOpen: !this.state.isEditPasswordOpen
        })
}
handleEditPasswordChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

EditPasswordFailure = () => {
    this.setState({
        isEditPasswordFailureOpen: !this.state.isEditPasswordFailureOpen
    })
  }

  EditPasswordSuccess = () => {
      this.setState({
          isEditPassWordSuccessOpen: !this.state.isEditPassWordSuccessOpen
      })
  }
  editPassWordButton = (e) => {
        
    e.preventDefault();
    let formResults = {
        id: this.state.t_id,
        old_password: this.state.old_password,
        new_password: this.state.new_password,
        Hash: passwordHash.generate(this.state.new_password)
       
    }

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
    };
    fetch('/settings/tutor-update-password', requestOptions)
    
    
   if(formResults.new_password == ''){
    this.state.error_message = 'New password can not be blank'
    this.EditPasswordFailure()
}
   else if (!passwordHash.verify(formResults.old_password, this.state.t_password)){
    this.state.error_message = 'Old passwords do not match!'    
    this.EditPasswordFailure()
   }
   
  
   else{
    
    this.state.t_password = formResults.Hash
    sessionStorage.setItem('t_password', formResults.Hash)

    this.EditPasswordSuccess()

    
   }
   if (this.state.isEditPasswordOpen === true) {
    this.toggleEditPassword()
}
  };
 


    //update name =============================================
    onEditNameFormSubmit = (e) => {
        e.preventDefault();

        let formResults = {
            name: this.state.updated_name,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-name', requestOptions)

        this.state.t_name = this.state.updated_name
        if (this.state.isEditNameModalOpen === true) {
            this.toggleEditNameModal()
        }
    };

    handleEditNameChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update age ==============================================
    onEditAgeFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            age: this.state.updated_age,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-age', requestOptions)

        this.state.t_age = this.state.updated_age
        if (this.state.isEditAgeModalOpen === true) {
            this.toggleEditAgeModal()
        }
    };

    handleEditAgeChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    //update location =========================================
    onEditLocationFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            location: this.state.updated_location,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-location', requestOptions)

        this.state.t_location = this.state.updated_location
        if (this.state.isEditLocationModalOpen === true) {
            this.toggleEditLocationModal()
        }
    };

    handleEditLocationChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    //update gender ============================================
    onEditGenderFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            gender: this.state.updated_gender,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-gender', requestOptions)

        this.state.t_gender = this.state.updated_gender
        if (this.state.isEditGenderModalOpen === true) {
            this.toggleEditGenderModal()
        }
    };

    handleEditGenderChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update education level ============================================
    onEditEduLevelFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            edu_level: this.state.updated_edu_level,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-edu-level', requestOptions)

        this.state.t_edu_level = this.state.updated_edu_level
        if (this.state.isEditEduLevelModalOpen === true) {
            this.toggleEditEduLevelModal()
        }
    };

    handleEditEduLevelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update major ============================================
    onEditMajorFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            major: this.state.updated_major,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-major', requestOptions)

        this.state.t_major = this.state.updated_major
        if (this.state.isEditMajorModalOpen === true) {
            this.toggleEditMajorModal()
        }
    };

    handleEditMajorChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update grade ============================================
    onEditGradeFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            grade: this.state.updated_grade,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-grade', requestOptions)

        this.state.t_grade = this.state.updated_grade
        if (this.state.isEditGradeModalOpen === true) {
            this.toggleEditGradeModal()
        }
    };

    handleEditGradeChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update phone number ============================================
    onEditPnumFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            pnum: this.state.updated_pnum,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-pnum', requestOptions)

        this.state.t_pnum = this.state.updated_pnum
        if (this.state.isEditPnumModalOpen === true) {
            this.toggleEditPnumModal()
        }
    };

    handleEditPnumChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update email ============================================
    onEditEmailFormSubmit = (e) => {
        e.preventDefault();
        let formResults = {
            email: this.state.updated_email,
            id: this.state.t_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/tutor-update-email', requestOptions)

        this.state.t_email = this.state.updated_email
        if (this.state.isEditEmailModalOpen === true) {
            this.toggleEditEmailModal()
        }
    };

    handleEditEmailChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //delete account 
    deleteAccount = () => {
        let url = '/settings/tutor-delete/' + this.state.t_id
        fetch(url);
        sessionStorage.clear();

        this.state.redirect_start = true;

        if (this.state.isDeleteConfirmModalOpen === true) {
            this.toggleDeleteConfirmModal();
        }
    }

    //logout from the account
    logout = () => {
        sessionStorage.clear();

        this.state.redirect_start = true;

        if (this.state.isLogoutConfirmModalOpen === true) {
            this.toggleLogoutConfirmModal();
        }
    }

    render() {

        if (this.state.redirect_start) {
            return <Redirect to={this.state.redirect_start_link} />
        }

        return (

            <React.Fragment>
                <div>
                <Row className='logo'><div className='edu-text'>edu</div><div className='fy-text'>FY</div></Row>
                    <NewNavBar/>
                    {/* <Nav tabs>
                        <NavItem>
                        <NavLink href="/tutor/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/tutor-matches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/tutor-settings">Settings</NavLink>
                        </NavItem>
                    </Nav> */}
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Settings</h1>
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
                                        Name: {this.state.t_name}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditNameModal}>
                                            Edit
                                        </Button>
                                    </Col>                               
                                </Row>

                                <Row>
                                    <Col>
                                        Age: {this.state.t_age}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditAgeModal}>
                                            Edit
                                        </Button>
                                    </Col>                         
                                </Row>

                                <Row>
                                    <Col>
                                        Gender: {this.state.t_gender}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditGenderModal}>
                                            Edit
                                        </Button>
                                    </Col>    
                                </Row>

                                <Row>
                                    <Col>
                                        Location: {this.state.t_location}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditLocationModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Education Level: {this.state.t_edu_level}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditEduLevelModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Average Grade: {this.state.t_grade}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditGradeModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Major: {this.state.t_major}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditMajorModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Phone Number: {this.state.t_pnum}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditPnumModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Email: {this.state.t_email}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditEmailModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Password:
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditPassword}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Button color="primary" size="sm" onClick={this.toggleLogoutConfirmModal}>
                                    Logout
                                </Button>{'   '}

                                <Button color="primary" size="sm" onClick={this.toggleDeleteConfirmModal}>
                                    Delete Account
                                </Button>

                                <Modal isOpen={this.state.isLogoutConfirmModalOpen} toggle={this.toggleLogoutConfirmModal} >
                                  <ModalHeader toggle={this.toggleLogoutConfirmModal}>Confirm Logout</ModalHeader>
                                  <ModalBody>
                                      <Button color="primary" onClick={this.logout} type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleLogoutConfirmModal}>Cancel</Button>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isDeleteConfirmModalOpen} toggle={this.toggleDeleteConfirmModal} >
                                  <ModalHeader toggle={this.toggleDeleteConfirmModal}>Confirm Delete</ModalHeader>
                                  <ModalBody>
                                      <Button color="primary" onClick={this.deleteAccount} type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleDeleteConfirmModal}>Cancel</Button>
                                  </ModalBody>
                                </Modal>
                                

                                <Modal isOpen={this.state.isEditNameModalOpen} toggle={this.toggleEditNameModal} >
                                  <ModalHeader toggle={this.toggleEditNameModal}>Edit Name</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditNameFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_name">Enter your updated name</Label>
                                        <Input type="text" name="updated_name" id="updated_name" onChange={e => this.handleEditNameChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditNameModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditAgeModalOpen} toggle={this.toggleEditAgeModal} >
                                  <ModalHeader toggle={this.toggleEditAgeModal}>Edit Age</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditAgeFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_age">Enter your updated age</Label>
                                        <Input type="text" name="updated_age" id="updated_age" onChange={e => this.handleEditAgeChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditAgeModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>







                                <Modal isOpen = {this.state.isEditPasswordOpen} toggle = {this.toggleEditPassword} >
                            <ModalHeader toggle = {this.toggleEditPassword}>Change your password here.</ModalHeader>
                            <ModalBody>
                                <Form onSubmit = {this.editPassWordButton}>
                                    <FormGroup>
                                        <Label for="old_password">Enter current password</Label>
                                        <Input type = "text" name ="old_password" id="old_password" onChange={e => this.handleEditPasswordChange(e)}/>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="new_password">Enter new password: </Label>
                                    <Input type="text" name="new_password" id="new_password" onChange={e => this.handleEditPasswordChange(e)}/>
                                    </FormGroup>
                                    <Button color="primary" type="submit">Submit password change</Button> {' '}
                                    <Button color="secondary" onClick={this.toggleEditPassword}>Close</Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                        <Modal isOpen = {this.state.isEditPassWordSuccessOpen} toggle = {this.EditPasswordSuccess}>
                            <ModalHeader toggle = {this.EditPasswordSuccess} >Success!</ModalHeader>
                            <ModalBody>
                                You have successfully changed your password.
                            </ModalBody>
                        </Modal>

                        <Modal isOpen = {this.state.isEditPasswordFailureOpen} toggle = {this.EditPasswordFailure}>
                            <ModalHeader toggle = {this.EditPasswordFailure} >Invalid</ModalHeader>
                            <ModalBody>
                                {this.state.error_message}
                            </ModalBody>
                            <ModalFooter>
                                     
                                  </ModalFooter>
                        </Modal>

                                

                                <Modal isOpen={this.state.isEditLocationModalOpen} toggle={this.toggleEditLocationModal} >
                                  <ModalHeader toggle={this.toggleEditLocationModal}>Edit Location</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditLocationFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_updated_locationLocation">Enter your updated location</Label>
                                        <Input type="text" name="updated_location" id="updated_location" onChange={e => this.handleEditLocationChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditLocationModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditGenderModalOpen} toggle={this.toggleEditGenderModal} >
                                  <ModalHeader toggle={this.toggleEditGenderModal}>Edit Gender</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditGenderFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_gender">Enter your updated gender</Label>
                                        <Input type="text" name="updated_gender" id="updated_gender" onChange={e => this.handleEditGenderChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditGenderModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditEduLevelModalOpen} toggle={this.toggleEditEduLevelModal} >
                                  <ModalHeader toggle={this.toggleEditEduLevelModal}>Edit Your Education Level</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditEduLevelFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_edu_level">Enter your updated gender</Label>
                                        <Input type="text" name="updated_edu_level" id="updated_edu_level" onChange={e => this.handleEditEduLevelChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditEduLevelModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditGradeModalOpen} toggle={this.toggleEditGradeModal} >
                                  <ModalHeader toggle={this.toggleEditGradeModal}>Edit Grade</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditGradeFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_grade">Enter your updated grade</Label>
                                        <Input type="text" name="updated_grade" id="updated_grade" onChange={e => this.handleEditGradeChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditGradeModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditMajorModalOpen} toggle={this.toggleEditMajorModal} >
                                  <ModalHeader toggle={this.toggleEditMajorModal}>Edit Your Major</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditMajorFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_major">Enter your updated major</Label>
                                        <Input type="text" name="updated_major" id="updated_major" onChange={e => this.handleEditMajorChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditMajorModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditEmailModalOpen} toggle={this.toggleEditEmailModal} >
                                  <ModalHeader toggle={this.toggleEditEmailModal}>Edit Your Email</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditEmailFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_email">Enter your updated email</Label>
                                        <Input type="text" name="updated_email" id="updated_email" onChange={e => this.handleEditEmailChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditEmailModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isEditPnumModalOpen} toggle={this.toggleEditPnumModal} >
                                  <ModalHeader toggle={this.toggleEditPnumModal}>Edit Your Phone Number</ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.onEditPnumFormSubmit}>
                                      <FormGroup>
                                        <Label for="updated_pnum">Enter your updated phone number</Label>
                                        <Input type="text" name="updated_pnum" id="updated_pnum" onChange={e => this.handleEditPnumChange(e)} />
                                      </FormGroup>
                                      <Button color="primary" type="submit">Confirm</Button> {' '}
                                      <Button color="secondary" onClick={this.toggleEditPnumModal}>Cancel</Button>
                                    </Form>
                                  </ModalBody>
                                </Modal>

                            
                        </Container>
                    </Jumbotron>
                </div>

            </React.Fragment>
            
        );
    }
}

export default TutorSetting;