import React from 'react';

import css from './Spinner.css';

const spinner = () => (
  <div className={css.Spinner}>  
    <div className={css.Lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span>Loading...</span>
  </div>
);

export default spinner;