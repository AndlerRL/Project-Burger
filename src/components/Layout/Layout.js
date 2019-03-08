import React from 'react';

import Aux from '../../hoc/Aux';
import css from './Layout.css';

const Layout = props => (
  <Aux>
    <div className={css.Toolbar + " z-depth-1"}>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={css.MainContent}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;