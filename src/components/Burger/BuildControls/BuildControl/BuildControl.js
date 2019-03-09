import React from 'react';

import css from './BuildControl.css';

const buildControl = props => (
  <div className={css.BuildControl}>
    <button
      className={css.Less + " btn waves-effect waves-circle z-depth-2"}
      onClick={props.removed}
      disabled={props.disabled} >
      <i className="material-icons">exposure_neg_1</i>
    </button>
    <div className={css.Label}>
      {props.label}
    </div>
    <button
      className={css.More + " btn waves-effect waves-circle z-depth-2"}
      onClick={props.added} >
      <i className="material-icons">exposure_plus_1</i>
    </button>
  </div>
);

export default buildControl;