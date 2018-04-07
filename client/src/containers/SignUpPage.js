import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';

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
    console.log('Form signup submitted', this.state);
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
