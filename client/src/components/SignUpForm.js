import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const displayError = error => !!(error && error.length > 0);

const SignUpForm = ({ onSubmit, onChange, errors, user }) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          name="name"
          label="Name"
          value={user.name}
          onChange={onChange}
          error={displayError(errors.name)}
          helperText={errors.name}
          required
        />
      </div>

      <div className="field-line">
        <TextField
          name="email"
          label="Email"
          value={user.email}
          onChange={onChange}
          error={displayError(errors.email)}
          helperText={errors.email}
          required
        />
      </div>

      <div className="field-line">
        <TextField
          name="password"
          label="Password"
          type="password"
          value={user.password}
          onChange={onChange}
          error={displayError(errors.password)}
          helperText={errors.password}
          required
        />
      </div>

      <div className="button-line">
        <Button type="submit" variant="raised" color="primary">
          Sign Up
        </Button>
      </div>

      <CardContent>
        Already have an account? <Link to="/login">Log in</Link>
      </CardContent>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
