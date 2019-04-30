import React, { useEffect } from 'react';
import AOS from 'aos';

import BuildControl from './BuildControl/BuildControl';

import css from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => {
  useEffect(() => {
    AOS.init({
      duration: 500
    })

    return () => {
      AOS.refresh();
    }
  }, [])
    
  return (
    <div
      className={css.BuildControls}
      data-aos="fade-right"
      data-aos-offset="10">
      <p>Current custom Burger Price: USD ${props.price.toFixed(2)}</p>
      <div className={css.ControlsContainer + " row"}>
        { controls.map(ctrl => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        )) }
      </div>
      <button
        className={"btn btn-large z-depth-1-half waves-effect waves-light teal darken-3 " + css.OrderBtn}
        disabled={!props.purchasable}
        onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
}

export default buildControls;