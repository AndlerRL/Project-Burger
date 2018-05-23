import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <span
    className={classes.DrawerToggle}
    onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </span>
);

export default drawerToggle;
