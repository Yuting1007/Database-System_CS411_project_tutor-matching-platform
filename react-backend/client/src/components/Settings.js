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


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditNameModalOpen:false,
            isEditAgeModalOpen:false,
            isEditLocationModalOpen:false,
            isEditGenderModalOpen:false,

            //student info
            s_id: sessionStorage.getItem('s_id'),
            s_name: sessionStorage.getItem('s_name'),
            s_age: sessionStorage.getItem('s_age'),
            s_location: sessionStorage.getItem('s_location'),
            s_gender: sessionStorage.getItem('s_gender'),
            s_ratings: sessionStorage.getItem('s_ratings'),

            //updated info
            updated_name:'',
            updated_age:'',
            updated_location:'',
            updated_gender:''
        };

        this.toggleEditNameModal = this.toggleEditNameModal.bind();
        this.toggleEditAgeModal = this.toggleEditAgeModal.bind();
        this.toggleEditLocationModal = this.toggleEditLocationModal.bind();
        this.toggleEditGenderModal = this.toggleEditGenderModal.bind();
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

    render() {
        return (

            <React.Fragment>
                <div>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Settings1</h1>
                                    
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </div>
            

                <div>
                    <Jumbotron>
                        
                        <Container>
                            <p>
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

                            </p>
                        </Container>
                    </Jumbotron>
                </div>

            </React.Fragment>
            
        );
    }
}

export default Settings;