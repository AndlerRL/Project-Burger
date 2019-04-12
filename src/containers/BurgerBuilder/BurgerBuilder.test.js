import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

Enzyme.configure({
  adapter: new Adapter()
})


describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ings: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      }
    })
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
})