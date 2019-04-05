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

// const domContainer = document.querySelector('#notification-app');

// window.microsite = {};
// window.microsite.notification = {
//   mount: () => {
//     ReactDOM.render(e(App), domContainer);
//   }
// };

// console.log('mounting..');

function getSelector() {
  const stackLines = new Error().stack.split('\n').filter(line => line.indexOf('mountPoint=') > 0);
  let mountPoint;

  if (stackLines.length > 0) {
    const startOffset = stackLines[0].indexOf('mountPoint=') + 11;
    const endOffset = stackLines[0].indexOf(':', startOffset);
    mountPoint = stackLines[0].substr(startOffset, endOffset - startOffset);
  }

  return mountPoint;
}

window.__MICROSITE__.sitesToMount.push((element, config) => {
  const el = document.querySelector(`#${getSelector()}`)
  ReactDOM.render(React.createElement(App, config), element || el);
});
// window.__MICROSITE__.mounter((selector = 'notification-app') => ReactDOM.render(e(App), document.querySelector(`#${selector}`)));
// console.log('script path:', new Error().stack.split('at'));

