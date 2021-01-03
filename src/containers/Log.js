/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../constants/Component';
import Login from '../components/log/Login';

class Log extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render = () => (<div><Login /></div>);
}
export default Log;
