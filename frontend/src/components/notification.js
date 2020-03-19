import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import '../utility/tabmanagement.css'
import axios from "axios";

const qs = require("qs");

class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.render.bind(this);
    this.state = {
      showModal: false,
      sender: "",
      subject: "",
      message: "",
      interest: "hello",
    };
  }



  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios(
      {
        method: "post",
        url: "http://localhost:8000/SCM/notification/",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.state)
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(this.close.bind(this));

  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    console.log(this.state)
  };

  close() {
    this.setState({
      showModal: false,
      sender: "",
      subject: "",
      message: "",
      interest: "hello",
    });
  }

  open() {
    this.setState({
      showModal: true,
      sender: this.props.auth.user.username
    });
  }

  render() {
    return (
      <div>
        <Button className="buttonStyle" onClick={this.open.bind(this)}>Send Notification</Button>
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Send Notification
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='ui container'>
              <div className='ui segment'>
                <Row>
                  <Col>
                    <form className='ui form'>
                      <label>
                        <b>Send to - </b>
                        <select
                          name="interest"
                          value={this.state.value}
                          onChange={this.myChangeHandler}
                        >
                          <option value="hello">All Routes</option>
                          <option value="route_one">Route One (Rohit)</option>
                          <option value="route_two">Route Two (Arzoo)</option>
                        </select>
                      </label>
                      <br />
                      <Row style={{ height: 70 }}>
                        <Col>
                          <TextField
                            name='subject'
                            type='text'
                            variant="outlined"
                            style={{ width: 250 }}
                            label='Subject'
                            onChange={this.myChangeHandler}
                          />
                        </Col>
                      </Row>
                      <Row style={{ height: 100 }}>
                        <Col>
                          <TextField
                            name='message'
                            type='text'
                            variant="outlined"
                            style={{ width: 250 }}
                            multiline
                            rows={3}
                            label='Message'
                            onChange={this.myChangeHandler}
                          />
                        </Col>
                      </Row>



                      <Button variant="light" color="primary" onClick={this.submitHandler}>Send</Button>
                    </form>
                  </Col>
                  <Col>
                    <Row><b>Preview - </b></Row>
                    <br />
                    <Row><small><b>Subject - {this.state.subject} </b></small></Row>
                    <Row>Hi {this.state.interest},</Row>
                    <div style={{ height: 50 }}>
                      <Row>{this.state.message}</Row>
                    </div>
                    <Row>Thanks,</Row>
                    <Row>{this.props.auth.user.username}</Row>
                    <Row>{this.username}</Row>

                  </Col>
                </Row>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Notification);