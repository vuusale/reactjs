import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';

class App extends Component { //different
  render() { //different
    // The rest of the file is the same
    return (
      <div className="App"> 
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Restaurant</NavbarBrand>
          </div>
        </Navbar>
      </div>
    )
  };
}

export default App;