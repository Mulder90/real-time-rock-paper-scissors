import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme();

const Base = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <TopBar />
    {children}
  </MuiThemeProvider>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
