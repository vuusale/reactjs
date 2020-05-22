import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';

class App extends Component { //different
  render() { //different
    // The rest of the file is the same
    return (
      <div> 
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Restaurant</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
      </div>
    )
  };
}

export default App;