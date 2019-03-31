import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import css from './Order.css';

const order = props => {
  const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }

  const amount = [];
  for (let ingredient in props.ingredients) {
    amount.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    })
  }

  return (
    <Aux>
    <div><span>Order # BURGER__{props.id}</span><span>User: {props.userName}</span></div>
    <table className={css.Order + ' striped z-depth-3 centered responsive-table'}>
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
          <td>${ INGREDIENTS_PRICE.bacon * amount[0].amount }</td>
        </tr>
        <tr>
          <td>{ amount[1].name }</td>
          <td>{ amount[1].amount }</td>
          <td>${ INGREDIENTS_PRICE.cheese }</td>
          <td>${ INGREDIENTS_PRICE.cheese * amount[1].amount }</td>
        </tr>
        <tr>
          <td>{ amount[2].name }</td>
          <td>{ amount[2].amount }</td>
          <td>${ INGREDIENTS_PRICE.meat }</td>
          <td>${ INGREDIENTS_PRICE.meat * amount[2].amount }</td>
        </tr>
        <tr>
          <td>{ amount[3].name }</td>
          <td>{ amount[3].amount }</td>
          <td>${ INGREDIENTS_PRICE.salad }</td>
          <td>${ INGREDIENTS_PRICE.salad * amount[3].amount }</td>
        </tr> 
        <tr>
          <td>–––</td>
          <td>–––</td>
          <td>–––</td>
          <th>${props.totalPrice}</th>
        </tr>
      </tbody>
    </table>
    </Aux>
  )
}

export default order;