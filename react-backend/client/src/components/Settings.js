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
var passwordHash = require('password-hash');

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditNameModalOpen:false,
            isEditAgeModalOpen:false,
            isEditLocationModalOpen:false,
            isEditGenderModalOpen:false,
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

            //student info
            s_id: sessionStorage.getItem('s_id'),
            s_name: sessionStorage.getItem('s_name'),
            s_age: sessionStorage.getItem('s_age'),
            s_location: sessionStorage.getItem('s_location'),
            s_gender: sessionStorage.getItem('s_gender'),
            s_ratings: sessionStorage.getItem('s_ratings'),
            s_email: sessionStorage.getItem('s_email'),
            s_pnum: sessionStorage.getItem('s_pnum'),
            s_password: sessionStorage.getItem('s_password'),

            // //student preference into
            // preference_major: sessionStorage.getItem('preference_major'),
            // preference_age: sessionStorage.getItem('preference_age'),
            // preference_edu_level: sessionStorage.getItem('preference_edu_level'),
            // preference_pastEx: sessionStorage.getItem('preference_pastEx'),

            //updated info
            updated_name:'',
            updated_age:'',
            updated_location:'',
            updated_gender:'', 
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
        this.toggleEditEmailModal = this.toggleEditEmailModal.bind();
        this.toggleEditPnumModal = this.toggleEditPnumModal.bind();
        this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind();
        this.toggleLogoutConfirmModal = this.toggleLogoutConfirmModal.bind();
        this.toggleEditPassword = this.toggleEditPassword.bind();
        this.EditPasswordFailure = this.EditPasswordFailure.bind();
        this.EditPasswordSuccess = this.EditPasswordSuccess.bind();
    }
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
        id: this.state.s_id,
        old_password: this.state.old_password,
        new_password: this.state.new_password,
        Hash: passwordHash.generate(this.state.new_password)
       
    }

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formResults})
    };
    fetch('/settings/update-password', requestOptions)
    
    
   if(formResults.new_password == ''){
    this.state.error_message = 'New password can not be blank'
    this.EditPasswordFailure()
}
   else if (!passwordHash.verify(formResults.old_password, this.state.s_password)){
    this.state.error_message = 'Old passwords do not match!'    
    this.EditPasswordFailure()
   }
   
  
   else{
    
    this.state.s_password = formResults.Hash
    sessionStorage.setItem('s_password', formResults.Hash)
    this.EditPasswordSuccess()

    
   }
   if (this.state.isEditPasswordOpen === true) {
    this.toggleEditPassword()
}
 
   

};


    toggleLogoutConfirmModal = () => {
        this.setState({
            isLogoutConfirmModalOpen : !this.state.isLogoutConfirmModalOpen
           })
    }

    toggleEditPnumModal = () => {
        this.setState({
            isEditPnumModalOpen : !this.state.isEditPnumModalOpen
           })
    }

    toggleEditEmailModal = () => {
        this.setState({
           isEditEmailModalOpen : !this.state.isEditEmailModalOpen
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


    //update name =============================================
    onEditNameFormSubmit = (e) => {
        e.preventDefault();

        let formResults = {
            name: this.state.updated_name,
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-name', requestOptions)

        this.state.s_name = this.state.updated_name
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
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-age', requestOptions)

        this.state.s_age = this.state.updated_age
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
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-location', requestOptions)

        this.state.s_location = this.state.updated_location
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
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-gender', requestOptions)

        this.state.s_gender = this.state.updated_gender
        if (this.state.isEditGenderModalOpen === true) {
            this.toggleEditGenderModal()
        }
    };

    handleEditGenderChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update Email =============================================
    onEditEmailFormSubmit = (e) => {
        e.preventDefault();

        let formResults = {
            email: this.state.updated_email,
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-email', requestOptions)

        this.state.s_email = this.state.updated_email
        if (this.state.isEditEmailModalOpen === true) {
            this.toggleEditEmailModal()
        }
    };

    handleEditEmailChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //update Phone Number =============================================
    onEditPnumFormSubmit = (e) => {
        e.preventDefault();

        let formResults = {
            pnum: this.state.updated_pnum,
            id: this.state.s_id
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/settings/update-pnum', requestOptions)

        this.state.s_pnum = this.state.updated_pnum
        if (this.state.isEditPnumModalOpen === true) {
            this.toggleEditPnumModal()
        }
    };

    handleEditPnumChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //delete account 
    deleteAccount = () => {
        let url = '/settings/delete/' + this.state.s_id
        fetch(url);
        sessionStorage.clear();

        this.state.redirect_start = true;

        if (this.state.isDeleteConfirmModalOpen === true) {
            this.toggleDeleteConfirmModal();
        }
    }

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
                                        Name: {this.state.s_name}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditNameModal}>
                                            Edit
                                        </Button>
                                    </Col>                               
                                </Row>

                                <Row>
                                    <Col>
                                        Age: {this.state.s_age}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditAgeModal}>
                                            Edit
                                        </Button>
                                    </Col>                         
                                </Row>

                                <Row>
                                    <Col>
                                        Gender: {this.state.s_gender}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditGenderModal}>
                                            Edit
                                        </Button>
                                    </Col>    
                                </Row>

                                <Row>
                                    <Col>
                                        Location: {this.state.s_location}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditLocationModal}>
                                            Edit
                                        </Button>
                                    </Col>                                  
                                </Row>

                                <Row>
                                    <Col>
                                        Phone Number: {this.state.s_pnum}
                                    </Col>

                                    <Col>
                                        <Button color="primary" size="sm" onClick={this.toggleEditPnumModal}>
                                            Edit
                                        </Button>
                                    </Col>                               
                                </Row>

                                <Row>
                                    <Col>
                                        Email: {this.state.s_email}
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

                                <Modal isOpen={this.state.isEditEmailModalOpen} toggle={this.toggleEditEmailModal} >
                                  <ModalHeader toggle={this.toggleEditEmailModal}>Edit Email</ModalHeader>
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
                                  <ModalHeader toggle={this.toggleEditPnumModal}>Edit Phone Number</ModalHeader>
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

export default Settings;