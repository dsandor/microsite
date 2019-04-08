import React, { Component } from 'react';
import './App.css';
import helper from 'microsite-child';

class App extends Component {
  render() {
    console.log('this:', this.props);
    return (
      <div className="App">
        <header className="App-header2">
          !NOTIFICATION-APP
          <div>{this.props.test}</div>
        </header>
      </div>
    );
  }
}

helper.registerMicrosite(App);
