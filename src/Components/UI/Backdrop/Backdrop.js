import React from 'react';

import css from './Backdrop.css';

const backdrop = props => (
  props.show ? 
    <div 
      onClick={props.cancel}
      className={css.Backdrop}></div> :
  null
);

export default backdrop;