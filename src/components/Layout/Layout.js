import React from 'react';

import Aux from '../../hoc/Aux';
import css from './Layout.css';

const Layout = props => (
  <Aux>
    <div className={css.Toolbar + " z-depth-1"}>
      <i className="small material-icons">menu</i>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={css.MainContent}>
      {props.children}
    </main>
    <footer className={css.Copyright}>
      Webapp made with love by <a href="http://Andlerrl.co" target="_blank" rel="noopener noreferrer">AndlerRL</a>. 2018 ® All rights reserved.
    </footer>
  </Aux>
);

export default Layout;