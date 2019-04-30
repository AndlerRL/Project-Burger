import { connect } from 'react-redux';
import React, { useState } from 'react';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import css from './Layout.css';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <React.Fragment>
      <Toolbar 
        isAuth={props.isAuthenticated}
        toggleMenu={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerToggleHandler}
        back={sideDrawerToggleHandler} />
      <main className={css.MainContent}>
        {props.children}
      </main>
      <footer className={css.Copyright}>
        Webapp made with love by <a href="http://Andlerrl.co" target="_blank" rel="noopener noreferrer">AndlerRL</a>. 2018 ® All rights reserved.
      </footer>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout);