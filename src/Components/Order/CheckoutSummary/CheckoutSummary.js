import React, { useEffect } from 'react';
import AOS from 'aos';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Icons from '../../UI/Icons/Icons';

import css from './CheckoutSummary.css';

const checkoutSummary = props => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 10
    })

    return () => {
      AOS.refresh();
    }
  }, [])

  return (
    <div className={css.CheckoutSummary} data-aos="fade-right">
      <h2>We know that you would like it!</h2>
      <div className={css.CheckoutBurger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className={css.CheckoutBtns}>
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
    </div>
  );
};

export default checkoutSummary;