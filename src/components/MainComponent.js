import React, { Component } from 'react'; 
import { Switch, Route, Redirect } from 'react-router-dom';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


// import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import FunctionalMenu from './functionalMenuComponent';
import FunctionalDishdetail from './FunctionalDishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  // onDishSelect(dishId) {
  //   if (this.state.selectedDish === dishId) this.setState( { selectedDish: null });
  //   else this.setState({ selectedDish: dishId });
  // }

  render() {
    const HomePage = () => {
      return(
        <Home 
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
          />
        );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <FunctionalMenu dishes={this.state.dishes} />} />
          <Route ecaxt path='/contactus' component={Contact} />
          <Redirect to='/home' />
        </Switch>
        {/* <FunctionalMenu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* <FunctionalDishdetail dish={this.state.dishes.filter(dish => 
            dish.id === this.state.selectedDish)[0]} /> */}
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* <Dishdetail 
            dish={this.state.dishes.filter(dish => 
            dish.id === this.state.selectedDish)[0]}/> */}
        <Footer />
      </div>
    )
  };
}


export default Main;