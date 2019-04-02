import React from 'react';

import Icon from '../../Icons/Icons';

import css from './Input.css';

const input = props => {
  let inputElement = null;
  let validationError = null;
  const invalid = [];

  if (props.invalid && props.shouldValidate && props.touched)
    invalid.push(css.Invalid)

  if (props.invalid && props.touched)
    validationError = (
      <p 
        className={css.ErrorMsg}>
        <Icon size="tiny">report</Icon>
        Please, enter a valid {props.label}
      </p>
    )

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={invalid} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('email'):
      inputElement = <input
        className={invalid} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={invalid} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('select'):
      inputElement = (
        <select
          className={invalid}
          value={props.value}
          onChange={props.changed}>
            <option disabled defaultValue>Choose your Delivery Option</option>
          { props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.displayValue}
            </option>
          )) }
        </select>
      )
      break;
    default:
      inputElement = <input
        className={invalid} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
  }

  return (
    <div className={"input-field " + css.Input}>
      { inputElement }
      <label htmlFor={props.for}>{props.label}</label>
      { validationError }
    </div>
  )
};

export default input;