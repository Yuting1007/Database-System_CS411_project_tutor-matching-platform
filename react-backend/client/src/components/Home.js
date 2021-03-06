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
import '../css/Home.css';
// import '../css/Home_local.css';


  var passwordHash = require('password-hash');


class StudentHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s_name: sessionStorage.getItem('s_name') + '!',
            s_id: sessionStorage.getItem('s_id'),
            s_password: sessionStorage.getItem('s_password'),
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
            isMatchExistAckModalOpen: false,
            isContributionAckModalOpen: false,

            //contribution
            isContributionFormModalOpen: false,
            contribute_link:'',
            contribute_course:'N/A',
            contribute_level:'N/A',
            contribute_major:'N/A',
            contribute_description:'',

        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
        this.togglePreferenceModal = this.togglePreferenceModal.bind();
        this.toggleRecommendListModal = this.toggleRecommendListModal.bind();
        this.toggleMatchExistAckModal = this.toggleMatchExistAckModal.bind();
        this.toggleMatchAckModal = this.toggleMatchAckModal.bind();
        this.toggleAddiPrefModal = this.toggleAddiPrefModal.bind();
        this.toggleResourceListModal = this.toggleResourceListModal.bind();
        this.toggleAddiFormErrorModal = this.toggleAddiFormErrorModal.bind();
        this.toggleContributeFormModal = this.toggleContributeFormModal.bind();
        this.toggleContributionAckModal = this.toggleContributionAckModal.bind();
    }

    toggleAddiFormErrorModal = () => {
        this.setState({
            isAddiFormErrorModalOpen: !this.state.isAddiFormErrorModalOpen
        })
    }

    toggleContributionAckModal = () => {
        this.setState({
            isContributionAckModalOpen: !this.state.isContributionAckModalOpen
        })
    }

    toggleContributeFormModal = () => {
        this.setState({
            isContributionFormModalOpen: !this.state.isContributionFormModalOpen
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

   
  
      EditPasswordSuccess = () => {
          this.setState({
              isEditPassWordSuccessOpen: !this.state.isEditPassWordSuccessOpen
          })
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
        this.state.preference_major = 'None'
        this.state.preference_gender = 'None'
        this.state.preference_pastEx = 'None'
        this.state.preference_rating = 'None'
        this.state.preference_edu_level = 'None'
    }

    searchAdditionalResource = (e) => {
        console.log("searchAdditionalResource called")
        e.preventDefault();
        let formResults = {
            addi_pre_course: this.state.addi_pre_course,
            addi_pre_level: this.state.addi_pre_level,
            addi_pre_major: this.state.addi_pre_major,
        }

        // if (formResults.addi_pre_major === '') {
        //     this.state.error_message = 'Major field cannot be empty!'
        //     this.toggleAddiFormErrorModal()
        // } else if (formResults.addi_pre_course === '') {
        //     this.state.error_message = 'Course field cannot be empty!'
        //     this.toggleAddiFormErrorModal()
        // } else {
        //     //POST req here
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({formResults})
        //     };

        //     fetch("/addition/get-resources", requestOptions)
        //     .then(res => res.json())
        //         //need to catch error somehow
        
        //     .then(resources => {
        //         console.log(resources)
        //         this.setState({ resources })
        //         this.toggleResourceListModal();
        //     });
        // }

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

    clickLink = (e) => {
        window.open(e.target.id)
    }

    contribute = (e) => {
        e.preventDefault();
        let formResults = {
            major: this.state.contribute_major,
            level: this.state.contribute_level,
            link: this.state.contribute_link,
            description: this.state.contribute_description,
            course: this.state.contribute_course
        }

        if (formResults.major === '') {
            formResults.major = 'N/A'
        }

        if (formResults.level === '') {
            formResults.level = 'N/A'
        }

        if (formResults.course === '') {
            formResults.course = 'N/A'
        }

        if (formResults.description === '') {
            console.log("reach this point")
            this.state.error_message = 'You have to provide a description to your study resource!'
            this.toggleAddiFormErrorModal()
        } else if (formResults.link === '') {
            this.state.error_message = 'You have to provide a link to your study resource!'
            this.toggleAddiFormErrorModal()
        } else {
            //POST req here
            const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
            };
            fetch('/addition/insert-resource', requestOptions)
            this.toggleContributionAckModal();
        }
    }

    doneContribution = () => {
        if (this.state.isContributionAckModalOpen === true) {
            this.toggleContributionAckModal();
        }
        if (this.state.isContributionFormModalOpen === true) {
            this.toggleContributeFormModal();
        }
        this.state.contribute_course = 'N/A'
        this.state.contribute_level = 'N/A'
        this.state.contribute_major = 'N/A'
        this.state.contribute_link = ''
        this.state.contribute_description = ''
    }

    doneAdditionalRecommendation = () => {
        if (this.state.isRecommendListModalOpen === true) {
            this.toggleRecommendListModal();
        }
        if (this.state.isPreferenceModalOpen === true) {
            this.togglePreferenceModal();
        }
        if (this.state.isAddiPrefModalOpen === true) {
            this.toggleAddiPrefModal();
        }
        if (this.state.isResourceListModalOpen === true) {
            this.toggleResourceListModal();
        }
    }


    render() {
        if (this.state.redirect_settings) {
            return <Redirect to={this.state.redirect_settings_link} />
        }
        
        return (
            <React.Fragment>
            
                <div>
                <Row className='logo'><div className='edu-text'>edu</div><div className='fy-text'>FY</div></Row>
                    <NewNavBar/>
                    {/* <Nav tabs>
                        <NavItem>
                        <NavLink href="/student/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/matches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                        </NavItem>
                    </Nav> */}
                    <Jumbotron >
                        <Container>
                            <Row>
                                <Col>
                                    <h1  style={{fontSize: 45, fontWeight: 'bold'}}>Welcome, {this.state.s_name}</h1>
                                    <p>
                                        Your student ID is {this.state.s_id}
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
                            <p className='button-p'>
                            <Button className='match-button-home' size="lg" style={{fontSize: 36, fontWeight: 'bold'}} onClick={this.onMatchButtonClick} block>Matches</Button>
                            </p>
                                
                            </Col>
                            <Col>
                            <p className='button-p'>
                                <Button className='recommend-button' size="lg" style={{fontSize: 36, fontWeight: 'bold'}} onClick={this.togglePreferenceModal} block>Recommend Tutors</Button>
                            </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>
                                    <Button color='primary' className='contribute-button' size="lg" style={{fontSize: 36, fontWeight: 'bold'}} onClick={this.toggleContributeFormModal} block>Contribute</Button>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <p>

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
                                <Button className='give-recommendation-button' type="submit">Give me recommendations!</Button> {' '}
                                <Button className='cancel-button' onClick={this.togglePreferenceModal}>Cancel</Button>
                            </Form>
                            </ModalBody>

                            
                        </Modal>


                        <Modal isOpen={this.state.isContributionFormModalOpen} toggle={this.toggleContributeFormModal} >
                            <ModalHeader toggle={this.toggleContributeFormModal}>Fill in the related information of the study resource you recommend</ModalHeader>
                            <ModalBody>
                            <Form onSubmit={this.contribute}>
                                <FormGroup>
                                    <Label for="contribute_link">The link of the study resource</Label>
                                    <Input type="text" name="contribute_link" id="contribute_link" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contribute_major">What major does this study resource most likely belongs to</Label>
                                    <Input type="text" name="contribute_major" id="contribute_major" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contribute_level">Course Level </Label>
                                    <Input type="select" name="contribute_level" id="contribute_level" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contribute_course">Course Number </Label>
                                    <Input type="number" name="contribute_course" id="contribute_course" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contribute_description">Please BRIEFLY describe the study resource</Label>
                                    <Input type="text" name="contribute_description" id="contribute_description" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <Button className='give-recommendation-button' type="submit">Submit my contribution!</Button> {' '}
                                <Button className='cancel-button' onClick={this.toggleContributeFormModal}>Cancel</Button>
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
                                                {/* <th>Email</th> */}
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
                                                {/* <td>{tutor.t_email}</td> */}
                                                <td><Button className='home-match-button' id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                  </ModalBody>

                                  <ModalFooter>
                                      Not satisfied with you what see? Try additional resources -->
                                      <Button 
                                        className='home-match-button'
                                        color="primary" 
                                        onClick={this.toggleAddiPrefModal}
                                        >Additional Resources
                                      </Button>
                                      <Button 
                                        // className='cancel-button'
                                        color="primary" 
                                        onClick={this.doneRecommendation}
                                        >Done
                                      </Button>
                                  </ModalFooter>
                                {/* </Modal> */}

                                {/* <ModalFooter>
                                      what to add additional resources?  -->
                                      <Button 
                                        className='home-match-button'
                                        color="primary" 
                                        onClick={this.toggleAddAddiPrefModal}
                                        >Add Additional Resources
                                      </Button>
                                      <Button 
                                        // className='cancel-button'
                                        color="primary" 
                                        onClick={this.doneRecommendation}
                                        >Done
                                      </Button>
                                  </ModalFooter> */}
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

                                <Modal isOpen={this.state.isContributionAckModalOpen} toggle={this.toggleContributionAckModal} >
                                    <ModalHeader toggle={this.toggleContributionAckModal}>You Have Submitted Your Study Resource Contribution!</ModalHeader>
                                    <ModalBody>
                                         Our stuff will carefully consider your contribution. If your contribution is selected as our study resource, you will be given 5 upvotes as rewards! {'   '}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.doneContribution} type="submit">Got It</Button> {' '}
                                    </ModalFooter>
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

                                {/* Add Additional Modal start here!
                                <Modal isOpen={this.state.isAddAddiPrefModalOpen} toggle={this.toggleAddAddiPrefModal} >
                                    <ModalHeader toggle={this.toggleAddAddiPrefModal}>Add study resource of a specific course in UIUC</ModalHeader>
                                    <ModalBody>
                                    <Form onSubmit={this.addAdditionalResource}>
                                        <FormGroup>
                                            <Label for="addi_pre_link">Resource Link</Label>
                                            <Input type="text" name="addi_pre_link" id="addi_pre_link" onChange={e => this.handlePreferenceChange(e)}/>
                                        </FormGroup>
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
                                        <FormGroup>
                                            <Label for="addi_pre_course">Course Description </Label>
                                            <Input type="text" name="addi_pre_description" id="addi_pre_description" onChange={e => this.handlePreferenceChange(e)}/>
                                        </FormGroup>                                   

                                        <Button color="primary" type="submit">Add this additional resource!</Button> {' '}
                                        <Button color="secondary" onClick={this.toggleAddiPrefModal}>Cancel</Button>
                                    </Form>
                                    </ModalBody>
                                </Modal> */}

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
                                        onClick={this.doneAdditionalRecommendation}
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
                {/* </Jumbotron> */}
                </div>
            </React.Fragment>
        );
    }
}

export default StudentHome;