import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Auth from '../utils/Auth';
import axios from 'axios';

class LoginPage extends Component {
  state = {
    errors: {},
    user: {
      email: '',
      password: ''
    },
    loggedIn: false,
    successMessage: ''
  };

  updateUser = event => {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  submitForm = event => {
    event.preventDefault();
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    axios
      .post('/auth/login', formData)
      .then(response => {
        Auth.authenticateUser(response.data.token, response.data.user.name);
        this.setState({
          errors: {},
          loggedIn: true
        });
      })
      .catch(error => {
        const response = error.response.data;
        const errors = response.errors || {};
        errors.summary = response.message;
        this.setState({
          errors
        });
      });
  };

  componentDidMount() {
    const successMessage = localStorage.getItem('successMessage') || '';
    localStorage.removeItem('successMessage');

    this.setState({
      successMessage
    });
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <LoginForm
        onChange={this.updateUser}
        onSubmit={this.submitForm}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
