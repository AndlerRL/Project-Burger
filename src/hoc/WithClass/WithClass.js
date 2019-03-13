import React from 'react';

const withClass = props => (
  <div className={props.css}>
    { props.children }
  </div>
);

export default withClass;