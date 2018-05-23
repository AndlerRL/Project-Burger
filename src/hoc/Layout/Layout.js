import React, { Component } from 'react';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  openMenuHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !this.state.showSideDrawer }
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.openMenuHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerToggleHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}
export default Layout;