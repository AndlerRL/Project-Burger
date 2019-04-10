import React from 'react';

import Icons from '../../UI/Icons/Icons';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import css from './Toolbar.css';

const toolbar = props => (
  <header className={css.Toolbar + " z-depth-1"}>
    <div
      onClick={props.toggleMenu}
      className={css.Menu}>
      <Icons size="small">menu</Icons>
    </div>
    <Logo height="90%" />
    <nav className={css.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;