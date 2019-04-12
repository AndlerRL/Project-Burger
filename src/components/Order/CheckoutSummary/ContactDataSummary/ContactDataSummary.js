import React from 'react';
import AOS from 'aos';

import css from './ContactDataSummary.css';

class ContactDataSummary extends React.Component {
  componentDidMount () {
    AOS.init({
      duration: 1000,
      offset: 10
    })
  }

  componentDidUpdate () {
    AOS.refresh();
  }

  render () {
    return (
      <div className={css.ContactDataSummary + ' z-depth-3'} data-aos="fade-down">
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.props.submit} id={this.props.form}>
          { this.props.children }
        </form>
      </div>
    );
  }
}

export default ContactDataSummary;