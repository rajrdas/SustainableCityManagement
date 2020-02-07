import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Navbar, Form} from 'react-bootstrap';
import LoginModal from './LoginModal';
import Image from './GettyImages.jpg'

var sectionStyle = {
   backgroundImage: `url(${Image})`,
   backgroundSize: 'cover'
}
class LandingPage extends React.Component {


    render() {

        return (
            <div style={sectionStyle}>
            <Row>


                <Col>

                    <Navbar bg="transparent" expand="lg">
                        <Navbar.Brand href="#home">Sustainable City Management</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline className="ml-auto">
                                <LoginModal />
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
            </div>

        );
    }

};




export default LandingPage;