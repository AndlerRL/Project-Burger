import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';



class BuildControls extends Component {
  render () {
    const controls = [
      { label: 'Salad', type: 'salad' },
      { label: 'Bacon', type: 'bacon' },
      { label: 'Cheese', type: 'cheese' },
      { label: 'Meat', type: 'meat' }
    ];

    return (
      <div className={classes.BuildControls}>
      <p>Current Price: <i className="fa fa-dollar"></i> <strong>{this.props.price.toFixed(2)}</strong> </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => this.props.ingredientAdded(ctrl.type)}
          removed={() => this.props.ingredientRemoved(ctrl.type)}
          disabled={this.props.disabled[ctrl.type]} />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!this.props.purchasable}
        onClick={this.props.ordered} >
        <i className="fa fa-credit-card"></i>  ORDER NOW
      </button>
    </div>
    )
  }

  
};

BuildControls.propTypes = {
  controls: PropTypes.array,
  price: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.string
}

export default BuildControls;