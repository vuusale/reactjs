import React, { Component } from 'react'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './HomeComponent';
import FunctionalMenu from './functionalMenuComponent';
import FunctionalDishdetail from './FunctionalDishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Demo from './DemoComponent';

import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const MapStatetoProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes())
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
  }
  
  render() {

    const HomePage = () => {
      return(
        <Home 
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={this.props.promotions.filter(promo => promo.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
          />
        );
    }

    const DishWithId = ({ match }) => {
      return(
        <FunctionalDishdetail 
          dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMsg}
          comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} 
          addComment={this.props.addComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <FunctionalMenu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
          <Route exact path='/demo' component={() => <Demo companies={this.props.companies} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    )
  };
}


export default withRouter(connect(MapStatetoProps, mapDispatchToProps)(Main));