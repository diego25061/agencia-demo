import React, { Component } from 'react';
import './App.css';
import MainContent from './containers/MainContent/MainContent';
import {BrowserRouter, Route} from 'react-router-dom'; 

class App extends Component {
  render() {
    
    var sectionStyle = {
      //backgroundImage: `url(${Background})`
    };

    return (
      <BrowserRouter>
          <MainContent/>
      </BrowserRouter>
    );
  }
}

export default App;
