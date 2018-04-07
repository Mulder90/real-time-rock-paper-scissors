import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

class LoginPage extends Component {
  state = {
    errors: {},
    user: {
      email: '',
      password: ''
    }
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
        this.setState({
          errors: {}
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

  render() {
    return (
      <LoginForm
        onChange={this.updateUser}
        onSubmit={this.submitForm}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
