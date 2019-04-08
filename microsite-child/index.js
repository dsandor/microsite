import React, { Component } from 'react';
import * as ReactDOM from "react-dom";

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
        ReactDOM.render(React.createElement(component, config), element);
      },
      micrositeId: getMicrositeId()
    });
}

export default {
  getMicrositeId,
  registerMicrosite
};

/*
module.exports = {
  getMicrositeId,
  registerMicrosite
};
*/
