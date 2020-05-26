import React, { Component } from 'react'; 
import { Switch, Route, Redirect } from 'react-router-dom';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { companies } from '../shared/companies';

// import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import FunctionalMenu from './functionalMenuComponent';
import FunctionalDishdetail from './FunctionalDishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Demo from './DemoComponent';

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

    const DishWithId = ({ match }) => {
      return(
        <FunctionalDishdetail 
        dish={this.state.dishes.filter(dish => 
          dish.id === parseInt(match.params.dishId, 10))[0]} 
        comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <FunctionalMenu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/demo' component={() => <Demo companies={companies} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    )
  };
}


export default Main;