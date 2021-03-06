import React, { Component } from 'react';

import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount(){

    axios.get("http://localhost:3333/smurfs")
         .then(response => this.setState({ smurfs: response.data }))
         .catch(error => console.log(error))

  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  updateItems = newSmurfs => {
    this.setState({ smurfs: newSmurfs });
  };

  render() {
    
    return (
      <div className="App">
              <nav>
                <h1>Smurf Village</h1>
                <div>
                  <NavLink to="/">
                    Home
                  </NavLink><br></br>
                  <NavLink to="/addSmurf">
                    Add a new Smurf
                  </NavLink>
                </div>
              </nav>
          <Route exact path="/" render={props => (
                <Smurfs {...props}  smurfs={this.state.smurfs}/>
              )}
          />
          <Route exact path="/addSmurf" render={props => (
                <SmurfForm {...props} updateItems={this.updateItems} />
              )}
          />
      </div>
    );
  }
}

export default App;
