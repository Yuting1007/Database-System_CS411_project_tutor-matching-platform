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
    Table, Modal, ModalHeader, ModalBody
} from 'reactstrap';

import '../css/Matches.css'
import TutorRating from './TutorRating';

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
            isDeleteMatchAcknowedgeModalOpen: false

           
        };

        this.onStudentToTutorMatchClick = this.onStudentToTutorMatchClick.bind();
        this.getMatches = this.getMatches.bind();
        this.deleteMatches = this.deleteMatches.bind();
        this.toggleDeleteMatchAcknowedgeModal = this.toggleDeleteMatchAcknowedgeModal.bind();
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

    toggleDeleteMatchAcknowedgeModal = () => {
        this.setState({
            isDeleteMatchAcknowedgeModalOpen: !this.state.isDeleteMatchAcknowedgeModalOpen
        })
    }

    deleteMatches = (e) => {
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
        fetch('/matches/match-create', requestOptions);

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
            <div>
                <p>eduFY</p>
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
                                <h1>Matches</h1>
                                <p>

                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Row>
                    <div className='matches-text'>Current Matches</div>
                    <Button onClick={this.getMatches}>Show/Refresh Matches!</Button>
                    
                </Row>
                
                <Table striped className="matches-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Education Level</th>
                            <th>Major</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tutorMatches.map(tutor => 
                        <tr key={tutor.t_id}>
                            <td className="id-col">{tutor.t_id}</td>
                            <td>{tutor.t_name}</td>
                            <td>{tutor.t_edu_level}</td>
                            <td>{tutor.t_major}</td>
                            <td>{tutor.t_location}</td>
                            <td>{tutor.t_email}</td>
                            <td>{tutor.t_pnum}</td>
                            <TutorRating tutorId={tutor.t_id} currentRating={tutor.t_ratings}/>
                            <td><Button id={tutor.t_id} onClick={this.deleteMatches}>Unmatch!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <MatchesPlaceholder matchesToDisplay={this.state.matchesToDisplay}/>
                <div className='matches-text'>All Tutors</div>
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
                </Table>

                <Modal isOpen={this.state.isDeleteMatchAcknowedgeModalOpen} toggle={this.toggleDeleteMatchAcknowedgeModal} >
                    <ModalHeader toggle={this.toggleDeleteMatchAcknowedgeModal}>Match with the selected tutor has been deleted!</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.getMatches} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                
                

            </div>
        );
    }
}

export default Matches;