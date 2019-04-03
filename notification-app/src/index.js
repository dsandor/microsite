import React, { Component } from 'react';
import './App.css';
import * as ReactDOM from "react-dom";

const e = React.createElement;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header2">
          !NOTIFICATION-APP!
        </header>
      </div>
    );
  }
}

export default App;

const domContainer = document.querySelector('#notification-app');
ReactDOM.render(e(App), domContainer);
