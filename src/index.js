import 'babel-polyfill';
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'fetch-ie8';
import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './jquery.min';
import routes from './routes';
import configureStore from './store/configureStore';

require('./less/common.less');
require('./less/normalize.css');
require('antd/lib/index.css');
require('es6-promise').polyfill();
Object.assign = require('object-assign');

// $('input, textarea').placeholder(); // eslint-disable-line

const store = configureStore();
window.console = window.console || (function() {
  const c = {};
  c.log = () => {};
  c.warn = () => {};
  c.debug = () => {};
  c.info = () => {};
  c.error = () => {};
  c.time = () => {};
  c.dir = () => {};
  c.profile = () => {};
  c.clear = () => {};
  c.exception = () => {};
  c.trace = () => {};
  c.assert = () => {};
  return c;
}());

Router.run(routes, (Handler) => {
  render(
    <Provider store={store}>
      <Handler />
    </Provider>,
    document.getElementById('app'));
});
