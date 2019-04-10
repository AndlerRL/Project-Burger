import { connect } from 'react-redux';
import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

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
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          toggleMenu={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);