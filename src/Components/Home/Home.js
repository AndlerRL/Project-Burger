import React from 'react';
import AOS from 'aos';

import SmallShop from '../UI/Imgs/SmallShop/SmallShop';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';
import Icon from '../UI/Icons/Icons';

import css from './Home.css';

class Home extends React.Component {
  componentDidMount() {
    AOS.init({
      duration: 1000,
      anchorPlacement: 'bottom-bottom'
    })
  }

  componentDidUpdate() {
    AOS.refresh()
  }

  burgerBuilderRedirectHandler = () => {
    this.props.history.push('/burger-builder');
  }

  signInRedirectHandler = () => {
    this.props.history.push('/sign-in');
  }

  render () {
    return (
      <Aux>
        <section className={css.Header} id="header">
          <div className={css.Container}>
            <h1>-Le Burger Builder-</h1>
            <h3>... a burger, made by you!</h3>
          </div>
        </section>
        <section className={css.Main}>
          <div className={css.DetailBtn}>
            <a href="#about-us"
              data-aos="zoom-in"
              data-aos-offset="10">
              <Icon 
                size="large">
                expand_more
              </Icon>
            </a>
          </div>
          
          <span id="about-us"></span>
          <div
            className={css.Container}
            data-aos="zoom-in"
            data-aos-offset="500">
            <p className={css.Lead_in}>
              Did you ever wander to taste a burger built by you but, prepared by a tremendous chef? Have you ever wanted to select the finest ingredients for your burger and being delivered at the door of your comfortable home?<br/>
              We made it possible! now, with the burger builder app you can make it, select the ingredients and being delivered at your home.
            </p>
            
            <hr />
            
            <p>
              Our selected web restaurant you can select the ingredients, took it by the local farmers, 100% organic vegetables, our bread is made by one of the greatest baker's on the region of Ohio, United States and also 100% angus meat. Every burger that you order goes with: Onions, Tomato, Mayonese, Honey Mustard and French Fries.
            </p>
            
            <div className={css.WithImg}>
              <p>
                Burger Builder App was born in a small town, in a local restaurant founded by a local enterprising who always wanted to deliver his hamburgers to all country and all arround the world.<br/>
                James Doe, at the age of 23 in 1977 decided to open his very first hamburger shopee, brind it too much taste for all the residents on the small town, now, his restaurant is available for all around US.
              </p>
              <SmallShop width="100%" />
            </div>
            
            <p className={css.Lead_in}>
              How it work?
            </p>

            <p>
              <strong>Create your profile!</strong><br/>
              Register yourself, only your email is required and yes, your address so we can find you; surf our web or simply, click the button bellow!
              <br/>
              <Button
                btnType="Success"
                clicked={this.signInRedirectHandler}>
                Sign In / Up here!
              </Button>
            </p>

            <p>
              <strong>Order as you like!</strong><br/>
              You can order as many burger as you want! Just follow the steps and you will be ordering as soon as your fingers let you go! You may cancel it whenever you want it and, that's it!<br/>
              Want to start ordering? click the button bellow and lets see what happen.
              <br/>
              <Button
                btnType="Success"
                clicked={this.burgerBuilderRedirectHandler}>
                Build your Burger here!
              </Button>
            </p>
          </div>
        </section>
      </Aux>
    )
  }
};

export default Home;