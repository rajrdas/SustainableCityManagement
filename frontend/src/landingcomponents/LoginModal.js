// frontend/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

class LoginForm extends Component {

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} type={type} />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
      </div>
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
        <Button variant="outline-dark" onClick={this.open.bind(this)}>Login/Register</Button>

        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Login/Register Form
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='ui container'>
              <div className='ui segment'>
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className='ui form'
                >
                  <Field
                    name='username'
                    type='text'
                    component={this.renderField}
                    label='Username'
                  />
                  <Field
                    name='password'
                    type='password'
                    component={this.renderField}
                    label='Password'
                  />
                  <Field
                    name='non_field_errors'
                    type='hidden'
                    component={this.hiddenField}
                  />
                  <button className='ui primary button'>Login</button>
                </form>
                <p style={{ marginTop: '1rem' }}>
                  Don't have an account? <Link to='/register'>Register</Link>
                </p>
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
