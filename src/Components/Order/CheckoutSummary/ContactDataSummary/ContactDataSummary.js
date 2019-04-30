import React, { useEffect } from 'react';
import AOS from 'aos';

import css from './ContactDataSummary.css';

const contactDataSummary = props => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 10
    })

    return () => {
      AOS.refresh();
    }
  }, []);

  return (
    <div className={css.ContactDataSummary + ' z-depth-3'} data-aos="fade-down">
      <h4>Enter your Contact Data</h4>
      <form onSubmit={props.submit} id={props.form}>
        { props.children }
      </form>
    </div>
  );
};

export default contactDataSummary;