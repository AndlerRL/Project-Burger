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
      <p>Current custom Burger Price: USD ${this.props.price.toFixed(2)}</p>
      <div className={css.ControlsContainer + " row"}>
        { controls.map(ctrl => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => this.props.ingredientAdded(ctrl.type)}
            removed={() => this.props.ingredientRemoved(ctrl.type)}
            disabled={this.props.disabled[ctrl.type]} />
        )) }
      </div>
      <button
        className={"btn btn-large z-depth-1-half waves-effect waves-light teal darken-3 " + css.OrderBtn}
        disabled={!this.props.purchasable}
        onClick={this.props.ordered}>
        {this.props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
}

export default buildControls;