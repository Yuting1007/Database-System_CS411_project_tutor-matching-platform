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
    Table
} from 'reactstrap';
import '../css/Matches.css'

class Matches extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
        this.state = {
            students: [],
            tutors: [],
            tutorMatches: [],
            userID: null
        };

        this.onStudentToTutorMatchClick = this.onStudentToTutorMatchClick.bind();
        this.getMatches = this.getMatches.bind();
        this.deleteMatches = this.deleteMatches.bind();
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

    deleteMatches = (e) => {
        let deleteTarget = e.target.id;
        let url = '/matches/delete/' + this.state.userID + '/' + deleteTarget;
        fetch(url);
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
        //console.log('unique tutors: ' + uniqueTutorMatches)
        this.setState({
            tutorMatches: uniqueTutorMatches
        })
      })
      
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
                <Button onClick={this.getMatches}>Show/Refresh Matches!</Button>
                <Table striped className="matches-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tutorMatches.map(tutor => 
                        <tr key={tutor.t_id}>
                            <td className="id-col">{tutor.t_id}</td>
                            <td>{tutor.t_name}</td>
                            <td>{tutor.t_age}</td>
                            <td>{tutor.t_location}</td>
                            <td><Button id={tutor.t_id} onClick={this.deleteMatches}>Unmatch!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <Table striped className="tutors-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tutors.map(tutor => 
                        <tr key={tutor.t_id}>
                            <td className="id-col">{tutor.t_id}</td>
                            <td>{tutor.t_name}</td>
                            <td>{tutor.t_age}</td>
                            <td>{tutor.t_location}</td>
                            <td><Button id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                
                

            </div>
        );
    }
}

export default Matches;