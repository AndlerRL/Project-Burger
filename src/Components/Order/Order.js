import React, { useEffect } from 'react';
import AOS from 'aos';

import Button from '../UI/Button/Button';
import Icon from '../UI/Icons/Icons';
import css from './Order.css';

const order = props => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 10
    })

    return () => {
      AOS.refresh();
    }
  }, [])

  const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }

  const amount = [];
  for (let ingredient in this.props.ingredients) {
    amount.push({
      name: ingredient,
      amount: this.props.ingredients[ingredient]
    })
  }

  //console.log(amount, this.props)
  
  return (
    <div className={css.OrderContainer} data-aos="fade-right">
      <div className={css.orderNum}>
        <span>Order # {this.props.id}</span>
        <span>Customer: {this.props.userName}</span>
      </div>
      <table className={css.Order + ' striped z-depth-3'}>
        <thead>
          <tr>
            <th>Ingredients</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ amount[0].name }</td>
            <td>{ amount[0].amount }</td>
            <td>${ INGREDIENTS_PRICE.bacon }</td>
            <td>${ (INGREDIENTS_PRICE.bacon * amount[0].amount).toFixed(2) }</td>
          </tr>
          <tr>
            <td>{ amount[1].name }</td>
            <td>{ amount[1].amount }</td>
            <td>${ INGREDIENTS_PRICE.cheese }</td>
            <td>${ (INGREDIENTS_PRICE.cheese * amount[1].amount).toFixed(2) }</td>
          </tr>
          <tr>
            <td>{ amount[2].name }</td>
            <td>{ amount[2].amount }</td>
            <td>${ INGREDIENTS_PRICE.meat }</td>
            <td>${ (INGREDIENTS_PRICE.meat * amount[2].amount).toFixed(2) }</td>
          </tr>
          <tr>
            <td>{ amount[3].name }</td>
            <td>{ amount[3].amount }</td>
            <td>${ INGREDIENTS_PRICE.salad }</td>
            <td>${ (INGREDIENTS_PRICE.salad * amount[3].amount).toFixed(2) }</td>
          </tr> 
          <tr>
            <td>–––</td>
            <td>–––</td>
            <td>–––</td>
            <th>${parseFloat(this.props.totalPrice).toFixed(2)}</th>
          </tr>
        </tbody>
      </table>
      <div className={css.BtnContainer}>
        <Button
          btnType="Danger"
          clicked={this.props.delete}>
          DELETE
          <Icon size="tiny">close</Icon>
        </Button>
      </div>
    </div>
  );
};

export default order;