import React from 'react';
import ReactDOM from 'react-dom';
import Base from './components/Base';
import InfoBox from './components/InfoBox';
import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Dashboard from './containers/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './utils/Auth';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Base>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route
          exact
          path="/dashboard"
          render={() => {
            if (!Auth.isUserAuthenticated()) {
              return (
                <InfoBox>
                  <h3>You are not logged in!</h3>
                </InfoBox>
              );
            } else {
              return <Dashboard />;
            }
          }}
        />

        {/* all others path */}
        <Route
          render={({ location }) => (
            <InfoBox>
              <h3>
                404! No matches for <code>{location.pathname}</code>
              </h3>
            </InfoBox>
          )}
        />
      </Switch>
    </Base>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
