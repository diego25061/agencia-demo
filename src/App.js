import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Background from './assets/fondo-tic-tac-toe.png';

import NavBar from './components/NavBar/NavBar'
import MainContent from './containers/MainContent/MainContent';
import {BrowserRouter, Route} from 'react-router-dom';
import { Image } from 'semantic-ui-react';

class App extends Component {
  render() {
    
    var sectionStyle = {
      //backgroundImage: `url(${Background})`
    };

    return (
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

      </div>*/
      <BrowserRouter>
        <Route path="" component={NavBar}/>
        <section style={ sectionStyle }>
          <MainContent/>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
