import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Navbar, Form} from 'react-bootstrap';
import LoginModal from './LoginModal';
import Image from './GettyImages.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Timeline } from 'react-twitter-widgets'
//import Logo from './logo.png'
import "../../node_modules/video-react/dist/video-react.css";
//import dubVid from 'https://www.youtube.com/watch?v=r1n1qe_uG40'

var sectionStyle = {
   backgroundImage: `url(${Image})`,
   backgroundSize: 'cover'
}
class LandingPage extends React.Component {


    render() {

        return (
            <div>
            <Row>
                <Col>
                    <Navbar bg="transparent" expand="lg">
                        <Navbar.Brand href="#home" inline>
                            <h1>Sustainable City Management</h1>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline className="ml-auto">
                                <LoginModal />
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <Row style={{ marginTop: -8 }}>
                <Col>
                    <div>
                        <iframe src='https://www.youtube.com/embed/r3btlOJhJmc?autoplay=1&controls=0&autohide=1&disablekb=1&loop=1&modestbranding=1'
                            allow='autoplay; encrypted-media'
                            allowFullScreen='allowFullScreen'
                            title='video'
                            style={{
                                height:'42.25vw', width:'100vw',
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{ marginLeft: 10 }}>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Timeline
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: 'DCCTraffic'
                                }}
                                options={{
                                    username: 'DCCTraffic',
                                    height: '400',
                                    width: '1200'
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

        );
    }

};




export default LandingPage;