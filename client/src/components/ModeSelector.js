import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader } from 'material-ui/Card';

const ModeSelector = ({ title, onClick, options, active }) => (
  <Card className="selector-container">
    <CardHeader title={title} />
    {options.map((option, index) => (
      <div
        className={active === option ? 'selector-item active' : 'selector-item'}
        key={option}
        onClick={() => onClick(option)}
      >
        {option}
      </div>
    ))}
  </Card>
);

ModeSelector.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired
};

export default ModeSelector;
