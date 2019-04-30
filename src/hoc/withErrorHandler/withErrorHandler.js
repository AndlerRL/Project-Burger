import React from 'react';

import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmed] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal
          show={error}
          modalClosed={errorConfirmed}>
          <div style={{
            transform: 'rotateZ(90deg)',
            margin: '1rem auto',
            width: '24px',
            height: '24px'
            }}> :(</div>
          <h4 align="center">Something went wrong!</h4>
          <code style={{margin: '5rem'}}>[ERROR] { error ? error.message : null }</code>
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}

export default withErrorHandler;