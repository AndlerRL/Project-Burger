import React from 'react';

import css from './Modal.css';

const modal = props => (
  <div className={"z-depth-5 " + css.Modal}>
    {props.children}
  </div>
);

export default modal;