import React from 'react';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import BikeChart from './bikechart';
import Pollution from './pollution';
import DublinBike from './dublinbike';
import DublinBus from './DublinBus'
import Event from './Event';
import Notification from './notification';
import './../TabManagement.css'


class TabMgmt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { component: <BikeChart /> }
  }
  showComponent(e) {
    if (typeof (e) === "undefined") {
      return this.state.component;
    } else if (e.target.id === "bus") {
      this.setState({ component: <DublinBus /> })
      return this.state.component;
    } else if (e.target.id === "pollution") {
      this.setState({ component: <Pollution /> })
      return this.state.component;
    } else if (e.target.id === "events") {
      this.setState({ component: <Event /> })
      return this.state.component;
    } else if (e.target.id === "bike") {
      this.setState({ component: <DublinBike /> })
      return this.state.component;
    } else if (e.target.id === "home") {
      this.setState({ component: <BikeChart /> })
      return this.state.component;
    } else {
      this.setState({component: <Notification/>})
      return this.state.component;
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="#home" style={{ color: "white" }}>Sustainable City Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button id="home" onClick={this.showComponent.bind(this)} className="buttonStyle">Home</Button>
              <Button id="bus" onClick={this.showComponent.bind(this)} className="buttonStyle">Dublin Bus</Button>
              <Button id="bike" onClick={this.showComponent.bind(this)} className="buttonStyle">Dublin Bike</Button>
              <Button id="pollution" onClick={this.showComponent.bind(this)} className="buttonStyle">Pollution</Button>
              <Button id="events" onClick={this.showComponent.bind(this)} className="buttonStyle">Events</Button>
              <Button id="notification" onClick={this.showComponent.bind(this)} className="buttonStyle">Notification</Button>
              <Button className="buttonStyle" onClick={this.props.logout}>Log Out</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          {this.showComponent()}
          }
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(TabMgmt);