import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';

const InfoBox = ({ children }) => (
  <Card className="container">
    <CardContent>{children}</CardContent>
  </Card>
);

InfoBox.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoBox;
