import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
// import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import FunctionalMenu from './functionalMenuComponent';
import FunctionalDishdetail from './FunctionalDishdetailComponent';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    if (this.state.selectedDish === dishId) this.setState( { selectedDish: null });
    else this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div> 
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <FunctionalMenu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <FunctionalDishdetail dish={this.state.dishes.filter(dish => 
            dish.id === this.state.selectedDish)[0]} />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* <Dishdetail 
            dish={this.state.dishes.filter(dish => 
            dish.id === this.state.selectedDish)[0]}/> */}
      </div>
    )
  };
}


export default Main;