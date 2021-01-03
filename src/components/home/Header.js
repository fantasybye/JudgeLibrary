/**
 * Created by frank on 2017/7/11.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import Component from '../../constants/Component';
import '../../less/home/header.less';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  logout = () => {
    HashLocation.push('/login');
    localStorage.user = '';
    this.$store.state.user = '';
  };
  render() {
    return (
      <div className="menu">
        <div className="home_welcome">
          <span>欢迎您，{this.$store.state.user.username}</span><span className="separator">|</span>
          <a onClick={this.logout.bind(this)}>退出</a>
        </div>
      </div>
    );
  }
}
export default Header;
