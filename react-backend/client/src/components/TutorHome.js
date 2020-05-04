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
import NewNavBar from './NewNavBar';
import '../css/Logo.css';
import '../css/Matches.css';
import '../css/Home.css';

class TutorHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            t_name: sessionStorage.getItem('t_name') + '!',
            t_id: sessionStorage.getItem('t_id'),

            //preference modal
            isPreferenceModalOpen: false,
            
            //preference info
            preference_location: 'None',
            preference_gender: 'None',
            preference_pastEx: 'None',
            preference_rating: 'None',

            //recommendation
            rec_students: [],
            isRecommendListModalOpen: false,
            userID: sessionStorage.getItem("t_id"),

            //confirmation
            isMatchAckModalOpen: false,
            isMatchExistAckModalOpen: false
        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
        this.togglePreferenceModal = this.togglePreferenceModal.bind();
        this.toggleRecommendListModal = this.toggleRecommendListModal.bind();
        this.toggleMatchExistAckModal = this.toggleMatchExistAckModal.bind();
        this.toggleMatchAckModal = this.toggleMatchAckModal.bind();
    }

    

    async componentDidMount() {
        this.state.t_name = sessionStorage.getItem('t_name')
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

    togglePreferenceModal = () => {
        this.setState({
            isPreferenceModalOpen: !this.state.isPreferenceModalOpen
        })
    }

    toggleRecommendListModal = () => {
        this.setState({
            isRecommendListModalOpen: !this.state.isRecommendListModalOpen
        })
    }

    onMatchButtonClick = () => {
        this.props.history.push('/tsmatches')
    }

    recommend = (e) => {
        e.preventDefault();
        let formResults = {
            preference_location: this.state.preference_location,
            preference_gender: this.state.preference_gender,
            preference_pastEx: this.state.preference_pastEx,
            preference_rating: this.state.preference_rating
        }
        if (formResults.preference_location === '') {
            formResults.preference_location = 'None'
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

        fetch('/matches/recommend-tutorEnd', requestOptions)
        .then(res => res.json())
        .then(rec_students => {
            console.log(rec_students)
            this.setState({ rec_students })
            this.toggleRecommendListModal();
        });
    }

    handlePreferenceChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onTutorToStudentMatchClick = (e) => {
        console.log("click");
        console.log(e.target.id);
        console.log(this.state.userID)
        // should first check if match exists !!!!!!!!!!!!!!!!!!!!!!!!!!
        

        let newMatch = {
            t_id: this.state.userID,
            s_id: e.target.id,
            m_s_like: 0,
            m_t_like: 1
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

        console.log("studentMatches: " +this.state.studentMatches)
        //call refresh
    };

    doneRecommendation = () => {
        if (this.state.isRecommendListModalOpen === true) {
            this.toggleRecommendListModal()
        }
        if (this.state.isPreferenceModalOpen === true) {
            this.togglePreferenceModal()
        }
    }

    render() {
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
                                    <h1>Welcome, {this.state.t_name}</h1>
                                    <p>
                                        Your tutor ID is {this.state.t_id}
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                    {/* <Jumbotron> */}
                        <Container>
                            <Row>
                                <Col>
                                    <p>
                                        <Button className='match-button-home' size="lg" style={{fontSize: 36, fontWeight: 'bold'}} onClick={this.onMatchButtonClick} block>Matches</Button>
                                    </p>
                                </Col>
                                <Col>
                                <p>
                                    <Button className='recommend-button' size="lg" style={{fontSize: 36, fontWeight: 'bold'}} onClick={this.togglePreferenceModal} block>Recommend Students</Button>
                                </p>
                                </Col>
                            </Row>

                            <Modal isOpen={this.state.isPreferenceModalOpen} toggle={this.togglePreferenceModal} >
                                <ModalHeader toggle={this.togglePreferenceModal}>Fill out this preference list and click recommend!</ModalHeader>
                                <ModalBody>
                                <Form onSubmit={this.recommend}>
                                    <FormGroup>
                                        <Label for="preference_location">Your preference on tutoring location</Label>
                                        <Input type="text" name="preference_location" id="preference_location" onChange={e => this.handlePreferenceChange(e)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="preference_gender">Your preference on student's gender</Label>
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
                                    <Button className='give-recommendation-button' type="submit">Give me recommendations!</Button> {' '}
                                    <Button className='cancel-recommendation-button' color="secondary" onClick={this.togglePreferenceModal}>Cancel</Button>
                                </Form>
                                </ModalBody>

                                
                            </Modal>


                            <Modal size='lg' isOpen={this.state.isRecommendListModalOpen} toggle={this.toggleRecommendListModal}>
                                <ModalHeader toggle={this.toggleRecommendListModal}>Here are our recommended students for you!</ModalHeader>
                                <ModalBody>
                                <Table striped className="student-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                            <th>Location</th>
                                            {/* <th>Email</th> */}
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.rec_students.map(student => 
                                        <tr key={student.s_id}>
                                            <td className="id-col">{student.s_id}</td>
                                            <td>{student.s_name}</td>
                                            <td>{student.s_ratings}</td>
                                            <td>{student.s_location}</td>
                                            {/* <td>{student.s_email}</td> */}
                                            <td>{student.s_pnum}</td>
                                            <td><Button id={student.s_id} onClick={this.onTutorToStudentMatchClick}>Match!</Button></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                                </ModalBody>

                                <ModalFooter>
                                    <Button 
                                        color="primary" 
                                        onClick={this.doneRecommendation}
                                        >Done
                                    </Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.isMatchExistAckModalOpen} toggle={this.toggleMatchExistAckModal} >
                                <ModalHeader toggle={this.toggleMatchExistAckModal}>You are already matched with this student! See your matched students in the match page</ModalHeader>
                                <ModalBody>
                                    <Button color="primary" onClick={this.toggleMatchExistAckModal} type="submit">Got It</Button> {' '}
                                </ModalBody>
                            </Modal>

                            <Modal isOpen={this.state.isMatchAckModalOpen} toggle={this.toggleMatchAckModal} >
                                <ModalHeader toggle={this.toggleMatchAckModal}>You are matched with the student! Go to the match page to see all your students.</ModalHeader>
                                <ModalBody>
                                    <Button color="primary" onClick={this.toggleMatchAckModal} type="submit">Got It</Button> {' '}
                                </ModalBody>
                            </Modal>
                        </Container>
                    {/* </Jumbotron> */}
                </div>
            </React.Fragment>
        );
    }
}

export default TutorHome;