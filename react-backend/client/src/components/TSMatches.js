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
import StudentRating from './StudentRating';

function EmptyMatches(props) {
    return <h3>No matches! Click refresh or find a student below!</h3>
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

class TSMatches extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
        this.state = {
            students: [],
            tutors: [],
            studentMatches: [],
            userID: null,
            matchesToDisplay: false,
            //tutorMatches: JSON.parse(sessionStorage.getItem('current_matches')),

            //confirmations
            isDeleteMatchAcknowedgeModalOpen: false,
            isMatchAckModalOpen: false,
            isMatchExistAckModalOpen: false

           
        };

        this.onTutorToStudentMatchClick = this.onTutorToStudentMatchClick.bind();
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

        fetch('/matches/all-students')
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(students => {
          console.log(students);
          this.setState({ students })
        });
        console.log(sessionStorage)
        this.setState({
            userID: sessionStorage.getItem("t_id")
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
            t_id: this.state.userID,
            s_id: e.target.id,
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
        let url = '/matches/delete/' + deleteTarget + '/' + this.state.userID;
        fetch(url);
        this.toggleDeleteMatchAcknowedgeModal();        
    }

    getMatches = () => {
        let studentIds = [];
        console.log("getting matches");
        let url = '/matches/show-student-matches/' + this.state.userID
      fetch(url)
      .then(res => res.json())
      .then(matches => {
        
        for (let x of matches) {
            studentIds.push(x['s_id'])
        }
        //console.log('student ids: ' + studentIdsIds);
        let myStudentsMatches = []
        for (let id of studentIds)  {
            for (let x of this.state.students) {
                if (x['s_id'] == id) {
                    myStudentsMatches.push(x);
                    break;
                }
            }
        }
        //console.log('tutor matches here: ' + myTutorMatches)
        //now remove duplicates
        let uniqueStudents = new Set(myStudentsMatches);
        let uniqueStudentMatches = [...uniqueStudents];
        if (uniqueStudentMatches == undefined || uniqueStudentMatches.length == 0) {
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
            studentMatches: uniqueStudentMatches
        })
      })

      if (this.state.isDeleteMatchAcknowedgeModalOpen === true) {
        this.toggleDeleteMatchAcknowedgeModal()
      }
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
        console.log("studentMatches: " +this.state.studentMatches)
        //call refresh
    };

    render() {
        return (
            <div>
                <p>eduFY</p>
                    <Nav tabs>
                        <NavItem>
                        <NavLink href="/tutor/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/tsmatches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/tutor-settings">Settings</NavLink>
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
                    {this.state.studentMatches.map(student => 
                        <tr key={student.s_id}>
                            <td className="id-col">{student.s_id}</td>
                            <td>{student.s_name}</td>
                            <td>{student.s_edu_level}</td>
                            <td>{student.s_major}</td>
                            <td>{student.s_location}</td>
                            <td>{student.s_email}</td>
                            <td>{student.s_pnum}</td>
                            <StudentRating studentId={student.s_id} currentRating={student.s_ratings}/>
                            <td><Button id={student.s_id} onClick={this.deleteMatches}>Unmatch!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <MatchesPlaceholder matchesToDisplay={this.state.matchesToDisplay}/>
                <div className='matches-text'>All Students</div>
                <Table striped className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => 
                        <tr key={student.s_id}>
                            <td className="id-col">{student.s_id}</td>
                            <td>{student.s_name}</td>
                            <td>{student.s_ratings}</td>
                            <td>{student.s_age}</td>
                            <td>{student.s_gender}</td>
                            <td>{student.s_location}</td>
                            <td><Button id={student.s_id} onClick={this.onTutorToStudentMatchClick}>Match!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.isDeleteMatchAcknowedgeModalOpen} toggle={this.toggleDeleteMatchAcknowedgeModal} >
                    <ModalHeader toggle={this.toggleDeleteMatchAcknowedgeModal}>Match with the selected student has been deleted!</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.getMatches} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isMatchExistAckModalOpen} toggle={this.toggleMatchExistAckModal} >
                    <ModalHeader toggle={this.toggleMatchExistAckModal}>You are already matched with this student!</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.toggleMatchExistAckModal} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isMatchAckModalOpen} toggle={this.toggleMatchAckModal} >
                    <ModalHeader toggle={this.toggleMatchAckModal}>You are matched with the student! Press the refresh button to see match result.</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={this.toggleMatchAckModal} type="submit">Got It</Button> {' '}
                    </ModalBody>
                </Modal>

                
                

            </div>
        );
    }
}

export default TSMatches;