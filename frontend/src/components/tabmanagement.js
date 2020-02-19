import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Pollution from "./pollution";
import DublinBike from "./dublinbike";
import Gmaps from "./gmaps";
import Notification from "./notification";
import Bmaps from "./bmaps";
import Exp from "./exp";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

class TabMgmt extends React.Component {
  render() {
    const { user, isAuthenticated } = this.props.auth; // added

    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="DublinBus" title="DublinBus">
            <br />
            <h3>Not yet implemented</h3>
            <br />
            <img src="https://cdn.mynotepaper.com/wp-content/uploads/2019/03/17160502/how-to-fix-the-429-too-many-requests-wordpress-error.png" />
          </Tab>
          <Tab eventKey="Pollution" title="Pollution">
            <Pollution />
          </Tab>
          <Tab eventKey="DublinBike" title="Dublin Bike">
            <DublinBike />
          </Tab>
          <Tab eventKey="Events" title="Events">
            <br />
            <h3>Not yet implemented</h3>
            <br />
            <img src="https://cdn.mynotepaper.com/wp-content/uploads/2019/03/17160502/how-to-fix-the-429-too-many-requests-wordpress-error.png" />
          </Tab>
          <Tab eventKey="GoogleMaps" title="GoogleMaps">
            <Gmaps />
          </Tab>
          <Tab eventKey="BingMaps" title="BingMaps">
            <Exp />
          </Tab>
          <Tab eventKey="Exp" title="Exp">
            <Exp />
          </Tab>
          <Tab eventKey="notification" title="Notification">
            <Notification />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(TabMgmt);
