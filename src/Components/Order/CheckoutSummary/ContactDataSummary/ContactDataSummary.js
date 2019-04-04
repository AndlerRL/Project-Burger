import React from 'react';

import css from './ContactDataSummary.css';

const contactDataSummary = props => (
  <div className={css.ContactDataSummary + ' z-depth-3'}>
    <h4>Enter your Contact Data</h4>
    <form onSubmit={props.submit} id={props.form}>
      { props.children }
    </form>
  </div>
);

export default contactDataSummary;