import React, { Component } from 'react';
import './Home.css';

import { Row } from 'reactstrap';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const background = require('../../images/Fractal.png');
const logoVertical = require('../../images/Shirtastic-vertical.svg');

class Home extends Component {

    render() {
        return (<div>
            <div className="img-container">
                <img src={background} alt="background" />
            </div>
            <Row>
                <div className="side-column">
                    {/* Login Component Goes Here */}
                    <Login />
                </div>
                <div className="center-column">
                    <img className="vertical-logo" src={logoVertical} alt="vertical logo" />
                    <div className="copyright text-center">© 2018 DEV6 – A division of The New Toronto Group Inc.</div>
                </div>
                <div className="side-column">
                    {/* Signup and Shipping tabs here */}
                    <Signup />
                </div>
            </Row>
        </div>);
    }
}
export default Home;