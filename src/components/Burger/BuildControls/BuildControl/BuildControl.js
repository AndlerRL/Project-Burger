import React from 'react';

import Icons from '../../../UI/Icons/Icons';

import css from './BuildControl.css';

const buildControl = props => (
  <div className={css.BuildControl}>
    <button
      className={css.Less + " btn waves-effect waves-circle z-depth-2"}
      onClick={props.removed}
      disabled={props.disabled} >
      <Icons>exposure_neg_1</Icons>
    </button>
    <div className={css.Label}>
      {props.label}
    </div>
    <button
      className={css.More + " btn waves-effect waves-circle z-depth-2"}
      onClick={props.added} >
      <Icons>exposure_plus_1</Icons>
    </button>
  </div>
);

export default buildControl;