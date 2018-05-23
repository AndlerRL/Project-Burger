import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle 
        clicked={props.drawerToggleClicked}/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
      <Logo height="80%" />
    </header>
  )
};

export default toolbar;