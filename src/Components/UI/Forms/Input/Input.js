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
      <span 
        className={"helper-text " + css.ErrorMsg}>
        <Icon size="tiny">report</Icon>
        Please, enter a valid {props.label}.
      </span>
    )

  if (props.invalid && props.touched && props.label === 'Confirm Password')
    validationError = (
      <span 
        className={"helper-text " + css.ErrorMsg}>
        <Icon size="tiny">report</Icon>
        Please, re-enter and confirm your Password.
      </span>
    )

  switch (props.elementType) {
    case ('input'):
      inputElement =<input
        ref={props.inputRef}
        onKeyPress={props.keyPress}
        className={invalid} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('email'):
      inputElement = <input
        className={invalid} 
        ref={props.inputRef}
        onKeyPress={props.keyPress}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={"materialize-textarea " + invalid}
        ref={props.inputRef}
        onKeyPress={props.keyPress}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case ('select'):
      inputElement = (
        <select
          className={invalid}
          ref={props.inputRef}
          onKeyPress={props.keyPress}
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
    case ('password'):
      inputElement = (
        <input
          className={invalid} 
          ref={props.inputRef}
          onKeyPress={props.keyPress}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
      )
      break;
    default:
      inputElement = <input
        className={invalid}
        ref={props.inputRef}
        onKeyPress={props.keyPress}
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