import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Icons from '../../UI/Icons/Icons';
import Aux from '../../../hoc/Aux';
import css from './SideDrawer.css';

const sideDrawer = props => {
  let attachedCss = [css.SideDrawer, "z-depth-5", css.Close];

  if (props.open) {
    attachedCss = [css.SideDrawer, "z-depth-5", css.Open]
  }
  
  return (
    <Aux>
      <Backdrop
        show={props.open}
        cancel={props.closed} />
      <div className={attachedCss.join(' ')}>
        <span 
          className={css.Back}
          onClick={props.back}>
          <Icons size="small">arrow_back</Icons>
        </span>
        <Logo height="10%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;