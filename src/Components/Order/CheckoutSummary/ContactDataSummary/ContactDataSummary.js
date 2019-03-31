import React from 'react';

import Button from '../../../UI/Button/Button';
import Icon from '../../../UI/Icons/Icons';

import css from './ContactDataSummary.css';

const contactDataSummary = props => (
  <div className={css.ContactDataSummary + ' z-depth-3'}>
    <h4>Enter your Contact Data</h4>
    <form>
      <div className={"input-field"}>
        <input type="text" name="name" placeholder="Jane Doe"></input>
        <label htmlFor="name">Your Name</label>
      </div>
      <div className={"input-field"}>
        <input type="email" name="email" placeholder="example@example.com"></input>
        <label htmlFor="email">E-mail</label>
      </div>  
      <div className={"input-field"}>
        <input type="text" name="street" placeholder="1350 Tuxedo Rd"></input>
        <label htmlFor="street">Street Address</label>
      </div>  
      <div className={"input-field"}>
        <input type="text" name="name" placeholder="Texas"></input>
        <label htmlFor="state">State</label>
      </div>  
      <div className={"input-field"}>
        <input type="text" name="name" placeholder="United States"></input>
        <label htmlFor="first_name">Country</label>
      </div>  
      <div className={"input-field"}>
        <input type="text" name="zipCode" placeholder="10109"></input>
        <label htmlFor="zipCode">zip-code</label>
      </div>

      <Button
        btnType="Success"
        clicked={props.orderBurger}>
        ORDER
        <Icon size="small">attach_money</Icon>
      </Button>
    </form>
  </div>
);

export default contactDataSummary;