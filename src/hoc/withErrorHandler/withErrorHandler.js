import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })

        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({
          error: err
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorComfirmedHandler = () => {
      this.setState({
        error: null
      })
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorComfirmedHandler}>
            <div style={{
              transform: 'rotateZ(90deg)',
              margin: '1rem auto',
              width: '24px',
              height: '24px'
              }}> :(</div>
            <h4 align="center">Something went wrong!</h4>
            <code style={{margin: '5rem'}}>[ERROR] { this.state.error ? this.state.error.message : null }</code>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;