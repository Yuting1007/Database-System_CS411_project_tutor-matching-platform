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
    Table, Modal, ModalHeader, ModalBody, Card, CardTitle, CardText, CardSubtitle, CardDeck, CardBody, CardHeader, CardFooter
} from 'reactstrap';

import '../css/Matches.css';
import '../css/Logo.css';
import TutorRating from './TutorRating';
import NewNavBar from './NewNavBar';

function EmptyMatches(props) {
    return <h3>No matches! Click refresh or find a tutor below!</h3>
}
function MatchesPresent(props) {
    return (null)
}
function MatchesPlaceholder(props) {
    const matchesToDisplay = props.matchesToDisplay;
    console.log('start')
    if (matchesToDisplay) {
        console.log('matches present')
        return <MatchesPresent />;
    }
    console.log('matches not present')
    return <EmptyMatches />;
}

class Matches extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
        this.state = {
            students: [],
            tutors: [],
            tutorMatches: [],
            userID: null,
            matchesToDisplay: false,
            //tutorMatches: JSON.parse(sessionStorage.getItem('current_matches')),
            userID: null,

            //confirmations
            isDeleteMatchAcknowedgeModalOpen: false,
            isMatchAckModalOpen: false,
            isMatchExistAckModalOpen: false

           
        };

        this.onStudentToTutorMatchClick = this.onStudentToTutorMatchClick.bind();
        this.getMatches = this.getMatches.bind();
        this.deleteMatches = this.deleteMatches.bind();
        this.toggleDeleteMatchAcknowedgeModal = this.toggleDeleteMatchAcknowedgeModal.bind();
        this.toggleMatchExistAckModal = this.toggleMatchExistAckModal.bind();
        this.toggleMatchAckModal = this.toggleMatchAckModal.bind();
    }

    
  
    async componentDidMount() {
    //   fetch('/matches/all-students')
    //     .then(res => {
    //       console.log(res);
    //       return res.json()
    //     })
    //     .then(students => {
    //       console.log(students);
    //       this.setState({ students })
    //     });

        fetch('/matches/all-tutors')
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(tutors => {
          console.log(tutors);
          this.setState({ tutors })
        });
        console.log(sessionStorage)
        this.setState({
            userID: sessionStorage.getItem("s_id")
        })
        //console.log("userID" + this.state.userID)

        this.getMatches();
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

    toggleDeleteMatchAcknowedgeModal = () => {
        this.setState({
            isDeleteMatchAcknowedgeModalOpen: !this.state.isDeleteMatchAcknowedgeModalOpen
        })
    }

    deleteMatches = (e) => {
        
        //First, GET THE TARGET MATCH FROM matches TABLE
        let newMatch = {
            t_id: e.target.id,
            s_id: this.state.userID,
            m_s_like: '',
            m_t_like: '',
            m_id: '',
            m_mutual: ''
           }
        console.log(newMatch)
           
        //POST req here
        const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newMatch})
        };

        //get the target matche
        fetch('/matches/match-check', requestOptions)
        .then(res => res.json())      
        .then(data => {
            console.log("reach this point")
            console.log(data)
            if (data.length === 0) {
                
            } else {
                newMatch.m_s_like = data[0].m_s_like;
                newMatch.m_id = data[0].m_id;
                newMatch.m_mutual = data[0].m_mutual;
                newMatch.m_t_like = data[0].m_t_like;
                //Second, INSERT THE DATA INTO HISTORY TABLE
                //POST req here
                const insertContent = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({newMatch})
                    };
                fetch('/matches/match-insertHistory', insertContent);
            }
        });

        //Third, delete from matches table
        let deleteTarget = e.target.id;
        let url = '/matches/delete/' + this.state.userID + '/' + deleteTarget;
        fetch(url);
        this.toggleDeleteMatchAcknowedgeModal();        
    }

    getMatches = () => {
        let tutorIds = [];
        console.log("getting matches");
        let url = '/matches/show-tutor-matches/' + this.state.userID
      fetch(url)
      .then(res => res.json())
      .then(matches => {
        
        for (let x of matches) {
            tutorIds.push(x['t_id'])
        }
        //console.log('tutor ids: ' + tutorIds);
        let myTutorMatches = []
        for (let id of tutorIds)  {
            for (let x of this.state.tutors) {
                if (x['t_id'] == id) {
                    myTutorMatches.push(x);
                    break;
                }
            }
        }
        //console.log('tutor matches here: ' + myTutorMatches)
        //now remove duplicates
        let uniqueTutors = new Set(myTutorMatches);
        let uniqueTutorMatches = [...uniqueTutors];
        if (uniqueTutorMatches == undefined || uniqueTutorMatches.length == 0) {
            this.setState({
                matchesToDisplay: false
            })
            console.log("NO MATCHES HAHA")
        } else {
            this.setState({
                matchesToDisplay: true
            })
            console.log("MATCHES< RENDER NOW")
        }
        //console.log('unique tutors: ' + uniqueTutorMatches)
        this.setState({
            tutorMatches: uniqueTutorMatches
        })
      })

      if (this.state.isDeleteMatchAcknowedgeModalOpen === true) {
        this.toggleDeleteMatchAcknowedgeModal()
      }
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

    // matchStudentToTutor = (e) => {
    //     this.toggleMatchAckModal();
    //     fetch('/matches/match-create', e);
    // }


        //fetch('/matches/match-create', requestOptions);

        // let targetTutor = e.target.id;
        // console.log("tutors: " + this.state.tutors);
        // for (let x of this.state.tutors) {
        //     console.log(x.t_id)
        //     if (x.t_id === targetTutor) {
        //         console.log("found tutor");
        //         let updatedTutors = this.state.tutors;
        //         updatedTutors.push(x);
        //         this.setState({
        //             tutorMatches: updatedTutors
        //         })
        //         break;
        //     }
        // }
        //this.getMatches();
        console.log("tutorMatches: " +this.state.tutorMatches)
        //call refresh
    };

    render() {
        return (
            <div >
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
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Matches</h1>
                                <p>

                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Row>
                    <div tag='h1' className='match-tutor-label'>Current Matches</div>
                    <Button className='refresh-button' onClick={this.getMatches}>Show/Refresh Matches!</Button>
                    
                </Row>
                
                
                
                
                
                
                <table class="simple_tabs">
                    <tr>
                        <td class="contentCell">
                            <div class="contentWrapper">
                            {this.state.tutorMatches.map(tutor => 
                                <div class="content">
                                    <Card className='match-card' style={{flex: 1, width:"300px"}}>
                                        <CardHeader tag="h3" style={{ fontWeight: 'bold' }}>{tutor.t_name}</CardHeader>
                                        <CardBody>
                                        
                                        <CardText tag="h5" className='edu-label' style={{ fontWeight: 'bold' }}>{tutor.t_edu_level}</CardText>
                                        <Row>
                                            <CardText className='major-label'>{tutor.t_major} Major</CardText>
                                        </Row>
                                        <Row className='location-group'>
                                            <img className='location-icon' src={'/images/locationnewblackcrop.png'} className='attribute-label'/>
                                            <CardText className='location-text'>{tutor.t_location}</CardText>
                                        </Row>
                                        
                                        
                                        <Row>
                                            <CardText className='attribute-label' style={{ fontWeight: 'bold' }}>Email: </CardText>
                                            <CardText className='attribute-text'>{tutor.t_email}</CardText>
                                        </Row>
                                        <Row>
                                            <CardText className='attribute-label' style={{ fontWeight: 'bold' }}>Age: </CardText>
                                            <CardText className='attribute-text'>{tutor.t_pnum}</CardText>
                                        </Row>
                                        
                                        <Row>
                                        <Button className='unmatch-button' id={tutor.t_id} onClick={this.deleteMatches}>Unmatch!</Button>
                                        <TutorRating tutorId={tutor.t_id} currentRating={tutor.t_ratings}/>
                                        </Row>
                                        
                                        </CardBody>
                                        <CardFooter className="text-muted">ID: {tutor.t_id}</CardFooter>
                                    </Card>
                                </div>
                                
                            )}
                            
                            
                                    
                            </div>
                        </td>
                    </tr>
                </table>
                <div className='matches-placeholder'>
                <MatchesPlaceholder matchesToDisplay={this.state.matchesToDisplay}/>
                </div>



                <hr className='line'/>

                
                <div tag='h1' className='all-tutor-label'>All Tutors</div>
                <table class="simple_tabs">
                    <tr>
                        <td class="contentCell">
                            <div class="contentWrapper">
                            {this.state.tutors.map(tutor => 
                                <div class="content">
                                    <Card className='all-card' style={{flex: 1, width:"300px"}}>
                                        <CardHeader tag="h3" style={{ fontWeight: 'bold' }}>{tutor.t_name}</CardHeader>
                                        <CardBody>
                                        
                                        <CardText tag="h5" className='edu-label' style={{ fontWeight: 'bold' }}>{tutor.t_edu_level}</CardText>
                                        <Row>
                                            <CardText className='major-label'>{tutor.t_major} Major</CardText>
                                        </Row>
                                        <Row className='location-group'>
                                            <img className='location-icon' src={'/images/locationnewblackcrop.png'} className='attribute-label'/>
                                            <CardText className='location-text'>{tutor.t_location}</CardText>
                                        </Row>
                                        
                                        
                                        <Row>
                                            <CardText className='attribute-label' style={{ fontWeight: 'bold' }}>Rating: </CardText>
                                            <CardText className='attribute-text'>{tutor.t_ratings}</CardText>
                                        </Row>
                                        <Row>
                                            <CardText className='attribute-label' style={{ fontWeight: 'bold' }}>Age: </CardText>
                                            <CardText className='attribute-text'>{tutor.t_age}</CardText>
                                        </Row>
                                        <Row>
                                            <CardText className='attribute-label' style={{ fontWeight: 'bold' }}>Gender: </CardText>
                                            <CardText className='attribute-text'>{tutor.t_gender}</CardText>
                                        </Row>
                    
                                        <Button className='match-button' id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button>
                                        </CardBody>
                                        <CardFooter className="text-muted">ID: {tutor.t_id}</CardFooter>
                                    </Card>
                                </div>
                                
                            )}
                            
                            
                                    
                            </div>
                        </td>
                    </tr>
                </table>
                
                {/* <div className='matches-text'>All Tutors</div>
                <Table striped className="tutors-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Education Level</th>
                            <th>Major</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tutors.map(tutor => 
                        <tr key={tutor.t_id}>
                            <td className="id-col">{tutor.t_id}</td>
                            <td>{tutor.t_name}</td>
                            <td>{tutor.t_ratings}</td>
                            <td>{tutor.t_age}</td>
                            <td>{tutor.t_gender}</td>
                            <td>{tutor.t_edu_level}</td>
                            <td>{tutor.t_major}</td>
                            <td>{tutor.t_location}</td>
                            <td><Button id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table> */}

                <Modal isOpen={this.state.isDeleteMatchAcknowedgeModalOpen} toggle={this.toggleDeleteMatchAcknowedgeModal} >
                    <ModalHeader toggle={this.toggleDeleteMatchAcknowedgeModal}>Match with the selected tutor has been deleted!</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.getMatches} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isMatchExistAckModalOpen} toggle={this.toggleMatchExistAckModal} >
                    <ModalHeader toggle={this.toggleMatchExistAckModal}>You are already matched with this tutor!</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.toggleMatchExistAckModal} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isMatchAckModalOpen} toggle={this.toggleMatchAckModal} >
                    <ModalHeader toggle={this.toggleMatchAckModal}>You are matched with the tutor! Press thr refresh button to see match result.</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.toggleMatchAckModal} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                
                

            </div>
        );
    }
}

export default Matches;