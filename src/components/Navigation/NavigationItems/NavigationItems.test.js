import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

Enzyme.configure({
  adapter: new Adapter()
})

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<NavigationItems />); 
  })

  it('should render three <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render four <NavigationItem /> elements if authenticated', () => {
    // wrapper = Enzyme.shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(4);
  });

  it('should an exact Logout Btn element if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true, clicked: true });
    expect(wrapper.contains(<NavigationItem exact link="/logout" clicked>
      Logout
    </NavigationItem>)).toEqual(true);
  });
});