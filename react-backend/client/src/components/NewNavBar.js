import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Row
} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import {NavLink as routerNav, useHistory} from 'react-router-dom'

class NewNavBar extends Component {
    constructor(props) {
        super(props);
        
        
        this.state = {
            type: sessionStorage.getItem('account_type'),
            isOpen: false, 

            //nav links
            settings:'',
            homepage:''
        };

        this.toMatches = this.toMatches.bind();
        this.toHome = this.toHome.bind();
        this.toSettings = this.toSettings.bind();
    }

    toHome = () => {
        if (this.state.type === 'student') {
            this.props.history.push('/student/home');
        } else {
            this.props.history.push('/tutor/home');
        }
    }

    toMatches = () => {
        if (this.state.type === 'student') {
            this.props.history.push('/matches');
        } else {
            this.props.history.push('/tsmatches');
        }
    }

    toSettings = () => {
        if (this.state.type === 'student') {
            this.props.history.push('/settings');
        } else {
            this.props.history.push('/tutor-settings');
        }
    }

    

    // updateLinks = () => {
    //     if (this.state.type === 'student') {
    //         this.state.settings = "/settings";
    //         this.state.homepage = "/student/home";
    //     } else if (this.state.type === "tutor") {
    //         this.state.settings = "/tutor-settings";
    //         this.state.homepage = "/tutor/home";
    //     }
    // }

    render() {
        
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                    <NavLink onClick={this.toHome}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink onClick={this.toMatches}>Matches</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink onClick={this.toSettings}>Settings</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default withRouter(NewNavBar);