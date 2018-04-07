import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';

class SignUpPage extends Component {
  state = {
    errors: {},
    user: {
      name: '',
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;
    axios
      .post('/auth/signup', formData)
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
      <SignUpForm
        onChange={this.updateUser}
        onSubmit={this.submitForm}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpPage;
