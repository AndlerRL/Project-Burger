import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Aux from '../../hoc/Aux';
import css from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar toggleMenu={this.sideDrawerToggleHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerToggleHandler}
          back={this.sideDrawerToggleHandler} />
        <main className={css.MainContent}>
          {this.props.children}
        </main>
        <footer className={css.Copyright}>
          Webapp made with love by <a href="http://Andlerrl.co" target="_blank" rel="noopener noreferrer">AndlerRL</a>. 2018 ® All rights reserved.
        </footer>
      </Aux>
    );
  }
};

export default Layout;