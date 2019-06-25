import React from 'react';
import { connect } from 'react-redux';

import './error-indicator.scss';

const ErrorIndicator = ({ error }) => {
  return <div>{`ERROR_MESSAGE: ${error.message}`}</div>;
};

const mapStateToProps = ({ error }) => {
  return { error };
};

export default connect(mapStateToProps)(ErrorIndicator);
