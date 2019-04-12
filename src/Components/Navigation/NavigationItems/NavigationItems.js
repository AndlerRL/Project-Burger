import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import css from './NavigationItems.css';

const navigationItems = props => (
  <ul className={css.NavigationItems}>
    <NavigationItem
      exact
      link="/"
      clicked={props.clicked}>
      Home
    </NavigationItem>
    <NavigationItem
      exact
      link="/burger-builder"
      clicked={props.clicked}>
      Burger Builder
    </NavigationItem>
    { props.isAuthenticated ?
      <NavigationItem
        link="/orders"
        clicked={props.clicked}>
        Orders
      </NavigationItem> :
      null }
    { !props.isAuthenticated ?
      <NavigationItem
        exact
        link="/sign-in"
        clicked={props.clicked}>
        Sign In / Up
      </NavigationItem> :
      <NavigationItem
        exact
        link="/logout"
        clicked={props.clicked}>
        Logout
      </NavigationItem> }
  </ul>
);

export default navigationItems;