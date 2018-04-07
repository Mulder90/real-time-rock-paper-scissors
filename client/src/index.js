import React from 'react';
import ReactDOM from 'react-dom';
import Base from './components/Base';
import Home from './components/Home';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Base>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />

        <Route
          render={({ location }) => (
            <h3>
              <Card className="container">
                <CardContent>
                  Error! No matches for <code>{location.pathname}</code>
                </CardContent>
              </Card>
            </h3>
          )}
        />
      </Switch>
    </Base>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
