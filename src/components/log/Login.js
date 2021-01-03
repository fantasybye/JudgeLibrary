/**
 * Created by frank on 2017/7/17.
 */
/* eslint-disable no-console*/
import React from 'react';
import { HashLocation } from 'react-router';
import Component from '../../constants/Component';

require('../../less/log/login.less');

const loginURL = 'url1'; // http://192.168.11.88:7012';
class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showWarning: false
    };
  }
  login = () => {
    const $this = this;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const url = `${loginURL}/api/decision_result/signin?username=${username}&password=${password}`;
    let obj = new XMLHttpRequest();
    if (window.ActiveXObject) {
      obj = new window.ActiveXObject('Microsoft.XMLHTTP');
    } else if (window.XMLHttpRequest) {
      obj = new XMLHttpRequest();
    } else {
      obj = null;
    }
    obj.open('POST', url);
    obj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // 发送信息至服务器时内容编码类型
    obj.onreadystatechange = () => {
      if (obj.readyState === 4 && (obj.status === 200 || obj.status === 304)) { // 304未修改
        const data = JSON.parse(obj.responseText);
        if (data.code === 0) {
          localStorage.user = JSON.stringify(data.data);
          $this.$store.state.user = {
            username: data.data.username,
            eventsId: data.data.events_id
          };
          HashLocation.push('/home');
        } else {
          $this.setState({
            showWarning: true
          });
        }
      }
    };
    obj.send();
  };
  render = () => (
    <div id="main">
      <div className="login_wrapper">
        {this.state.showWarning ? <div id="warning">
          <img alt="" src={require('../../assets/login/warning.png')} />
          <span>密码错误,请重新输入</span>
        </div> : null}
        <div>
          <i id="username_icon" className="icon_user" />
          <input type="text" placeholder="请输入用户名或邮箱" className="login_input" id="username" />
        </div>
        <div>
          <i id="password_icon" className="icon_user" />
          <input type="password" placeholder="请输入密码" className="login_input" id="password" />
        </div>
        <input type="checkbox" id="login_checkbox" />
        <span className="checkbox_intro">下次自动登录</span>
        <input type="button" id="login_btn" onClick={this.login.bind(this)} />
        <div className="miitbeian">
          <a
            href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action"
            rel="noopener noreferrer"
            target="_blank"
          >苏ICP备12019764号</a>
        </div>
      </div></div>)
}
export default Login;
