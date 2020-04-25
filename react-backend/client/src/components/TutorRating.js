import React, { Component } from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import '../css/TutorRating.css'

// blue hex code is 7193ff
// orange hex code is ff8b60
const imagesPath = {
    upvoteGrey: "/images/upvote.png",
    upvoteOrange: "/images/upvote-orange.png",
    downvoteGrey: "/images/downvote.png",
    downvoteBlue: "/images/downvote-blue.png"
}

class TutorRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tutorId: this.props.tutorId,
            isOpen: false,
            noVote: true,
            downVote: false,
            upVote: false,
            currentRating: this.props.currentRating
        };

        this.upvoted = this.upvoted.bind();
        this.downvoted = this.downvoted.bind();
        this.getUpvoteImageName = this.getUpvoteImageName.bind();
        this.getDownvoteImageName = this.getDownvoteImageName.bind();
    }

    upvoted = async () => {
        let updatedRating = this.state.currentRating;
        // if no vote, make upvote
        if (this.state.noVote) {
            this.setState({
                upVote: true,
                noVote: false,
                downVote: false
            })
            updatedRating = updatedRating + 1;
        }
        // if upvoted, undo vote
        if (this.state.upVote) {
            this.setState({
                upVote: false,
                noVote: true,
                downVote: false
            })
            updatedRating = updatedRating - 1;
        }
        // if downvoted, undo downvote and upvote (this is why +2)
        if (this.state.downVote) {
            this.setState({
                upVote: true,
                noVote: false,
                downVote: false
            })
            updatedRating = updatedRating + 2;
        }
        //setting state
        this.setState({
            currentRating: updatedRating
        })
        //API call start
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };

        let url = '/ratings/update-tutor-rating/' + this.state.tutorId + '/' + updatedRating
        await fetch(url, requestOptions);
    }

    downvoted = async () => {
        let updatedRating = this.state.currentRating;
        // if no vote, make downvote
        if (this.state.noVote) {
            console.log('downvoting' + this.state.currentRating)
            this.setState({
                upVote: false,
                noVote: false,
                downVote: true
            })
            updatedRating = updatedRating - 1;
            console.log(this.state.currentRating)
        }
        // if downvoted, undo vote
        if (this.state.downVote) {
            this.setState({
                upVote: false,
                noVote: true,
                downVote: false
            })
            updatedRating = updatedRating + 1;
        }
        // if upvoted, undo upvote and downvote (this is why -2)
        if (this.state.upVote) {
            this.setState({
                upVote: false,
                noVote: false,
                downVote: true
            })
            updatedRating = updatedRating - 2;
        }
        //setting state
        this.setState({
            currentRating: updatedRating
        })
        //API call start
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };

        let url = '/ratings/update-tutor-rating/' + this.state.tutorId + '/' + updatedRating
        console.log(url)
        console.log('making api call')
        await fetch(url, requestOptions);
    }


    getUpvoteImageName = () => {
        if (this.state.upVote) {
            return "upvoteOrange";
        } else {
            return "upvoteGrey"
        }
    }

    getDownvoteImageName = () => {
        if (this.state.downVote) {
            return "downvoteBlue";
        } else {
            return "downvoteGrey"
        }
    }
    
    render() {
        const upvoteImageName = this.getUpvoteImageName();
        const downvoteImageName = this.getDownvoteImageName();
        return (
            <td className="outerBox">
                <Col className="colBox">
                <img src={imagesPath[upvoteImageName]} onClick={this.upvoted} className="upvoteImg"/>
            <div className="voteText">{this.state.currentRating}</div>
                <img src={imagesPath[downvoteImageName]} onClick={this.downvoted} className="downvoteImg"/>
                </Col>
            </td>
        );
    }
}

export default TutorRating;