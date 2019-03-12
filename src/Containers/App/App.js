import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
// import css from './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;