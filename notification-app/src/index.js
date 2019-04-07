import React, { Component } from 'react';
import './App.css';
import * as ReactDOM from "react-dom";

//const e = React.createElement;

class App extends Component {
  render() {
    console.log('this:', this.props);
    return (
      <div className="App">
        <header className="App-header2">
          !NOTIFICATION-APP!
          <div>{this.props.test}</div>
        </header>
      </div>
    );
  }
}

export default App;

function getMicrositeId() {
  const stackLines = new Error().stack.split('\n').filter(line => line.indexOf('_microsite-id_=') > 0);
  let mountPoint;

  if (stackLines.length > 0) {
    const startOffset = stackLines[0].indexOf('_microsite-id_=') + 15;
    const endOffset = stackLines[0].indexOf(':', startOffset);
    mountPoint = stackLines[0].substr(startOffset, endOffset - startOffset);
  }

  return mountPoint;
}

function registerMicrosite(component) {
  window.__MICROSITE__.sitesToMount.push(
    {
      mount: (element, config) => {
        ReactDOM.render(React.createElement(App, config), element);
      },
      micrositeId: getMicrositeId()
    });
}

registerMicrosite(App);
