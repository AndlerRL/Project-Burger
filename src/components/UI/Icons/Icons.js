import React from 'react';

const icons = props => (
  <i className={props.size + " material-icons"} >
    {props.children}
  </i>
);

export default icons;