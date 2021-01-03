/**
 * Created by frank on 2017/7/19.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import Component from '../constants/Component';
import '../less/commons/header.less';

/* eslint-disable react/prop-types*/
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
      <div className="keyword_div">
        <div className="center">
          <div className="home clearfix" title="点击返回法官审务库首页">
            <a onClick={() => {
              HashLocation.push('/');
            }}
            ><img alt="" src={require('../assets/commons/logo_little.png')} />法官审务库</a>
          </div>
          {this.props.children}
          <div className="welcome">
            <label>欢迎您，{this.$store.state.user.username}</label><span className="separator">|</span>
            <a onClick={this.logout.bind(this)}>退出</a>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;

