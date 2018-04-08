import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Auth from '../utils/Auth';

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">Rock Paper Scissors</Link>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/dashboard">
            <Button type="submit" variant="raised">
              Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button
              type="submit"
              variant="raised"
              onClick={Auth.deauthenticateUser}
            >
              Logout
            </Button>
          </Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">
            <Button type="submit" variant="raised">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button type="submit" variant="raised">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </div>

    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
