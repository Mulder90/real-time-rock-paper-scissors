import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

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
    console.log('Form login submitted', this.state);
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
