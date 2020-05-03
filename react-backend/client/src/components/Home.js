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
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";

class StudentHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s_name: sessionStorage.getItem('s_name') + '!',
            s_id: sessionStorage.getItem('s_id'),
            redirect_settings: false,
            redirect_settings_link: '/settings', 
            isPreferenceModalOpen: false,

            //preference info
            preference_major: 'None',
            preference_edu_level: 'None',
            preference_gender: 'None',
            preference_pastEx: 'None',
            preference_rating: 'None',

            //additional resource preference
            addi_pre_major:'',
            addi_pre_level:'',
            addi_pre_course:'',
            isAddiPrefModalOpen: false,
            resources:[],
            isResourceListModalOpen: false,

            //additional resource form error
            error_message:'',
            isAddiFormErrorModalOpen:false,

            //recommendation
            rec_tutors: [],
            isRecommendListModalOpen: false,
            userID: sessionStorage.getItem("s_id"),

            //confirmation
            isMatchAckModalOpen: false,
            isMatchExistAckModalOpen: false
        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
        this.togglePreferenceModal = this.togglePreferenceModal.bind();
        this.toggleRecommendListModal = this.toggleRecommendListModal.bind();
        this.toggleMatchExistAckModal = this.toggleMatchExistAckModal.bind();
        this.toggleMatchAckModal = this.toggleMatchAckModal.bind();
        this.toggleAddiPrefModal = this.toggleAddiPrefModal.bind();
        this.toggleResourceListModal = this.toggleResourceListModal.bind();
        this.toggleAddiFormErrorModal = this.toggleAddiFormErrorModal.bind();
    }

    //this.toggleRedirect_settings = this.toggleRedirect_settings.bind();

    async componentDidMount() {
        this.state.s_name = sessionStorage.getItem('s_name')
    }

    toggleAddiFormErrorModal = () => {
        this.setState({
            isAddiFormErrorModalOpen: !this.state.isAddiFormErrorModalOpen
        })
    }

    toggleResourceListModal = () => {
        this.setState({
            isResourceListModalOpen: !this.state.isResourceListModalOpen
        })
    }

    toggleAddiPrefModal = () => {
        this.setState({
            isAddiPrefModalOpen: !this.state.isAddiPrefModalOpen
        })
    }

    toggleMatchAckModal = () => {
        this.setState({
            isMatchAckModalOpen: !this.state.isMatchAckModalOpen
        })
    }

    toggleMatchExistAckModal = () => {
        this.setState({
            isMatchExistAckModalOpen: !this.state.isMatchExistAckModalOpen
        })
    }

    toggleRecommendListModal = () => {
        this.setState({
            isRecommendListModalOpen: !this.state.isRecommendListModalOpen
        })
    }

    togglePreferenceModal = () => {
        this.setState({
            isPreferenceModalOpen: !this.state.isPreferenceModalOpen
        })
    }

    onMatchButtonClick = () => {
        this.props.history.push('/matches')
    }

    redirectToSetting = () => {
        this.setState({
            redirect_settings: !this.state.redirect_settings
        })
    }

    handlePreferenceChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    recommend = (e) => {
        e.preventDefault();
        let formResults = {
            preference_major: this.state.preference_major,
            preference_edu_level: this.state.preference_edu_level,
            preference_gender: this.state.preference_gender,
            preference_pastEx: this.state.preference_pastEx,
            preference_rating: this.state.preference_rating
        }
        if (formResults.preference_major === '') {
            formResults.preference_major = 'None'
        }
        if (formResults.preference_rating === '') {
            formResults.preference_rating = 'None'
        }
        console.log(formResults)

        //POST req here
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/matches/recommend', requestOptions)
        .then(res => res.json())
        .then(rec_tutors => {
            console.log(rec_tutors)
            this.setState({ rec_tutors })
            this.toggleRecommendListModal();
        });
    }

    onStudentToTutorMatchClick = (e) => {
        // console.log("click");
        console.log(e.target.id);
        console.log(this.state.userID)
        // should first check if match exists !!!!!!!!!!!!!!!!!!!!!!!!!!
        

        let newMatch = {
            t_id: e.target.id,
            s_id: this.state.userID,
            m_s_like: 1,
            m_t_like: 0
           }
        console.log(newMatch)
           
        //POST req here
        const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newMatch})
        };

        //check for existing matches
        fetch('/matches/match-check', requestOptions)
        .then(res => res.json())      
        .then(data => {
            console.log("reach this point")
            console.log(data)
            if (data.length === 0) {
                this.toggleMatchAckModal();
                //this.matchStudentToTutor(requestOptions)
                fetch('/matches/match-create', requestOptions);
            } else {
                console.log("already exists")
                this.toggleMatchExistAckModal();
            }
        });
        console.log("tutorMatches: " +this.state.tutorMatches)
    };

    doneRecommendation = () => {
        if (this.state.isRecommendListModalOpen === true) {
            this.toggleRecommendListModal()
        }
        if (this.state.isPreferenceModalOpen === true) {
            this.togglePreferenceModal()
        }
    }

    searchAdditionalResource = (e) => {

        e.preventDefault();
        let formResults = {
            addi_pre_course: this.state.addi_pre_course,
            addi_pre_level: this.state.addi_pre_level,
            addi_pre_major: this.state.addi_pre_major,
        }
        
        if (formResults.addi_pre_major === '') {
            this.state.error_message = 'Major field cannot be empty!'
            this.toggleAddiFormErrorModal()
        } else if (formResults.addi_pre_course === '') {
            this.state.error_message = 'Course field cannot be empty!'
            this.toggleAddiFormErrorModal()
        } else {
            //POST req here
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formResults})
            };

            fetch("/addition/get-resources", requestOptions)
            .then(res => res.json())
                //need to catch error somehow
        
            .then(resources => {
                console.log(resources)
                this.setState({ resources })
                this.toggleResourceListModal();
            });
        }
    }

    clickLink = (e) => {
        window.open(e.target.id)
    }


    render() {
        if (this.state.redirect_settings) {
            return <Redirect to={this.state.redirect_settings_link} />
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
                                    <h1>Welcome, {this.state.s_name}</h1>
                                    <p>
                                        Your student ID is {this.state.s_id}
                                    </p>
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
                            <p>
                                <Button color="primary" size="lg" onClick={this.onMatchButtonClick} block>Matches</Button>
                            </p>
                                
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            <p>
                                <Button color="primary" size="lg" onClick={this.togglePreferenceModal} block>Recommend Tutors</Button>
                            </p>
                            </Col>
                        </Row>

                        <Modal isOpen={this.state.isPreferenceModalOpen} toggle={this.togglePreferenceModal} >
                            <ModalHeader toggle={this.togglePreferenceModal}>Fill out this preference list and click recommend!</ModalHeader>
                            <ModalBody>
                            <Form onSubmit={this.recommend}>
                                <FormGroup>
                                    <Label for="preference_major">Your preference on tutor's major</Label>
                                    <Input type="text" name="preference_major" id="preference_major" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_edu_level">Your preference on education level</Label>
                                    <Input type="select" name="preference_edu_level" id="preference_edu_level" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>None</option>
                                        <option>Elementary School</option>
                                        <option>Middle School</option>
                                        <option>High School</option>
                                        <option>College</option>
                                        <option>Master</option>
                                        <option>PhD</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_gender">Your preference on tutor's gender</Label>
                                    <Input type="select" name="preference_gender" id="preference_gender" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>None</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_pastEx">Do you want us to consider your past matching experience? </Label>
                                    <Input type="select" name="preference_pastEx" id="preference_pastEx" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                          <Label for="preference_rating">Minimum Rating (Blank if you have no preference on rating)</Label>
                                          <Input type="number" name="preference_rating" id="tutor_regi-preference_rating" onChange={e => this.handlePreferenceChange(e)} />
                                        </FormGroup>
                                <Button color="primary" type="submit">Give me recommendations!</Button> {' '}
                                <Button color="secondary" onClick={this.togglePreferenceModal}>Cancel</Button>
                            </Form>
                            </ModalBody>

                            
                        </Modal>

                        <Modal size='lg' isOpen={this.state.isRecommendListModalOpen} toggle={this.toggleRecommendListModal}>
                                  <ModalHeader toggle={this.toggleRecommendListModal}>Here are our recommended tutors for you!</ModalHeader>
                                  <ModalBody>
                                    <Table striped className="tutors-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Rating</th>
                                                <th>Education</th>
                                                <th>Major</th>
                                                <th>Phone Number</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.rec_tutors.map(tutor => 
                                            <tr key={tutor.t_id}>
                                                <td className="id-col">{tutor.t_id}</td>
                                                <td>{tutor.t_name}</td>
                                                <td>{tutor.t_ratings}</td>
                                                <td>{tutor.t_edu_level}</td>
                                                <td>{tutor.t_major}</td>
                                                <td>{tutor.t_pnum}</td>
                                                <td>{tutor.t_email}</td>
                                                <td><Button id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                  </ModalBody>

                                  <ModalFooter>
                                      Not satisfied with you what see? Try additional resources -->
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleAddiPrefModal}
                                        >Additional Resources
                                      </Button>
                                      <Button 
                                        color="primary" 
                                        onClick={this.doneRecommendation}
                                        >Done
                                      </Button>
                                  </ModalFooter>
                                </Modal>

                                <Modal isOpen={this.state.isMatchExistAckModalOpen} toggle={this.toggleMatchExistAckModal} >
                                    <ModalHeader toggle={this.toggleMatchExistAckModal}>You are already matched with this tutor! See your matched tutors in the match page</ModalHeader>
                                    <ModalBody>
                                        <Button color="primary" onClick={this.toggleMatchExistAckModal} type="submit">Got It</Button> {' '}
                                    </ModalBody>
                                </Modal>

                                <Modal isOpen={this.state.isMatchAckModalOpen} toggle={this.toggleMatchAckModal} >
                                    <ModalHeader toggle={this.toggleMatchAckModal}>You are matched with the tutor! Go to the match page to see all your tutors.</ModalHeader>
                                    <ModalBody>
                                        <Button color="primary" onClick={this.toggleMatchAckModal} type="submit">Got It</Button> {' '}
                                    </ModalBody>
                                </Modal>

                                {/* Additional Modal start here! */}

                                <Modal isOpen={this.state.isAddiPrefModalOpen} toggle={this.toggleAddiPrefModal} >
                                    <ModalHeader toggle={this.toggleAddiPrefModal}>Get study resource of a specific course in UIUC</ModalHeader>
                                    <ModalBody>
                                    <Form onSubmit={this.searchAdditionalResource}>
                                        <FormGroup>
                                            <Label for="addi_pre_major">Course Major (Enter abbreviation with capital letters)</Label>
                                            <Input type="text" name="addi_pre_major" id="addi_pre_major" onChange={e => this.handlePreferenceChange(e)}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="addi_pre_level">Course Level </Label>
                                            <Input type="select" name="addi_pre_level" id="addi_pre_level" onChange={e => this.handlePreferenceChange(e)}>
                                                <option>100</option>
                                                <option>200</option>
                                                <option>300</option>
                                                <option>400</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="addi_pre_course">Course Number </Label>
                                            <Input type="text" name="addi_pre_course" id="addi_pre_course" onChange={e => this.handlePreferenceChange(e)}/>
                                        </FormGroup>
                                        <Button color="primary" type="submit">Give me additional resources!</Button> {' '}
                                        <Button color="secondary" onClick={this.toggleAddiPrefModal}>Cancel</Button>
                                    </Form>
                                    </ModalBody>
                                </Modal>


                                {/*Resource List Modal Below*/}
                                <Modal size='lg' isOpen={this.state.isResourceListModalOpen} toggle={this.toggleResourceListModal}>
                                  <ModalHeader toggle={this.toggleResourceListModal}>Here are our recommended study resources!</ModalHeader>
                                  <ModalBody>
                                    <Table striped className="resources-table">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.resources.map(resources => 
                                            <tr key={resources.link}>
                                                <td>{resources.description}</td>
                                                <td><Button id={resources.link} onClick={this.clickLink} color="link">Check It Out!</Button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleResourceListModal}
                                        >Done
                                      </Button>
                                  </ModalFooter>
                                </Modal>

                                <Modal isOpen={this.state.isAddiFormErrorModalOpen} toggle={this.toggleAddiFormErrorModal}>
                                  <ModalHeader toggle={this.toggleAddiFormErrorModal}>Invalid Information</ModalHeader>
                                  <ModalBody>
                                    {this.state.error_message}
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleAddiFormErrorModal}
                                        >Fix It
                                      </Button>
                                  </ModalFooter>
                                </Modal>

                                

                                
                    </Container>
                </Jumbotron>
                </div>
            </React.Fragment>
        );
    }
}

export default StudentHome;