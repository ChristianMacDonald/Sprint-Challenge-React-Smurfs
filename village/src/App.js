import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import Axios from 'axios';

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

  componentDidMount() {
    Axios.get('http://localhost:3333/smurfs')
      .then(result => {
        this.setState({ smurfs: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addSmurf = smurf => {
    Axios.post('http://localhost:3333/smurfs', smurf)
      .then(result => {
        this.setState({ smurfs: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  removeSmurf = id => {
    Axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(result => {
        this.setState({ smurfs: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/smurf-form">Add Smurf</NavLink>
        </nav>
        <Route exact path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} removeSmurfHandler={this.removeSmurf} />} />
        <Route path="/smurf-form" render={props => <SmurfForm {...props} addSmurfHandler={this.addSmurf} />} />
      </div>
    );
  }
}

export default App;
