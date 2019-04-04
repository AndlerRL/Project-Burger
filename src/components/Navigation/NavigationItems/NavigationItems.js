import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import css from './NavigationItems.css';

const navigationItems = props => (
  <ul className={css.NavigationItems}>
    <NavigationItem
      exact
      link="/"
      clicked={props.clicked}>
      Burger Builder
    </NavigationItem>
    <NavigationItem
      link="/orders"
      clicked={props.clicked}>
      Orders
    </NavigationItem>
  </ul>
);

export default navigationItems;