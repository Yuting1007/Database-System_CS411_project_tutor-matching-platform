import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {NavLink as routerNav} from 'react-router-dom'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            type: sessionStorage.getItem('account_type'),
            isOpen: false, 

            //nav links
            settings:'',
            homepage:''
        };
    }

    updateLinks = () => {
        if (this.state.type === 'student') {
            this.state.settings = "/settings";
            this.state.homepage = "/student/home";
        } else if (this.state.type === "tutor") {
            this.state.settings = "/tutor-settings";
            this.state.homepage = "/tutor/home";
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        this.updateLinks();
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand href={this.state.homepage}>eduFY</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href = {this.state.settings} >Settings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={"/users"}>Users (dev)</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;