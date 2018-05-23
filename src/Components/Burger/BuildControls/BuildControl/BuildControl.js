import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>
    <span
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>
      { props.disabled === true ?
        <span className={classes.Disabled}>
        <i className={"fa fa-minus"}></i>
        </span> :
        <i className="fa fa-minus"></i>
      }
    </span>
    <span 
      className={classes.More}
      onClick={props.added}>
      <i className="fa fa-plus"></i>
    </span>
      <p>{props.label}</p>      
    </div>
  </div>
);

export default buildControl;