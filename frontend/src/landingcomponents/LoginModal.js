// frontend/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Tabs, Tab, Button, Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const required = value => (value == null ? 'Required' : undefined);


class LoginForm extends Component {

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false
    }
  }

  renderField = ({ input, label, type, meta: { error } }) => {
    return (
        <TextField
            {...input}
            label={label}
            type={type}
            input={input}
            variant="outlined" 
            error={error}
        />
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className='field'>
        <input type={type} />
        {error && <div className='ui red message'>{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
  <div>
    <Button variant="outline-dark" onClick={this.open.bind(this)}>Login</Button>

    <Modal size="sm" show={this.state.showModal} onHide={this.close.bind(this)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='ui container'>
        <div className='ui segment'>
          <form className='ui form'>
            <Row style={{height:70}}>
                <Col>
                    <Field
                      name='username'
                      type='text'
                      component={this.renderField}
                      label='Username'
                    />
                </Col>
            </Row>
            <Row style={{height:70}}>
                <Col>
                    <Field
                      name='password'
                      type='password'
                      component={this.renderField}
                      label='Password'
                    />
                </Col>
            </Row>
            <Row style={{height:40}}>
                <Col>
                    <Field
                      name='non_field_errors'
                      type='hidden'
                      component={this.hiddenField}
                    />
                </Col>
            </Row>

            <Button variant="dark" color="primary"  onClick={this.props.handleSubmit(this.onSubmit)}>Login</Button>
          </form>

        </div>
      </div>
    </Modal.Body>
  </Modal>
</div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
