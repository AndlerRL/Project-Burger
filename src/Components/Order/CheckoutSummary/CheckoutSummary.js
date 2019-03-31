import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Icons from '../../UI/Icons/Icons';

import css from './CheckoutSummary.css';

const checkoutSummary = props => {
  
  return (
    <div className={css.CheckoutSummary}>
      <h2>We know that you would like it!</h2>
      <div style={{
        width: '100%',
        margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={props.checkoutCancel}>
        CANCEL
        <Icons size="small">close</Icons>
      </Button>
      <Button
        btnType="Success"
        clicked={props.checkoutContinue}>
        CONTINUE
        <Icons size="small">check</Icons>
      </Button>
    </div>
  );
}

export default checkoutSummary;