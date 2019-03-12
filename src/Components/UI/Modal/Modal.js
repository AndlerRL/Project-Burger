import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import css from './Modal.css';

const modal = props => (
  <Aux>
    <Backdrop
      cancel={props.modalClosed}
      show={props.show} />
    <div 
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-120vh)',
        opacity: props.show ? '1' : '0'
      }}
      className={"z-depth-5 " + css.Modal}>
      {props.children}
    </div>
  </Aux>
);

export default modal;