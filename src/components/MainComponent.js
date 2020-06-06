import React, { Component } from 'react'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './HomeComponent';
import FunctionalMenu from './functionalMenuComponent';
import FunctionalDishdetail from './FunctionalDishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStatetoProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
  render() {

    const HomePage = () => {
      return(
        <Home 
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errMsg}
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
          comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} 
          commentsErrMsg={this.props.comments.errMsg}
          postComment={this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <FunctionalMenu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    )
  };
}


export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Main));