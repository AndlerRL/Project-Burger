import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import css from './NavigationItems.css';

const navigationItems = () => (
  <ul className={css.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;