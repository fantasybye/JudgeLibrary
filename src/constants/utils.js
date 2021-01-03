import qs from 'qs';
/* eslint-disable camelcase*/
const axios = require('axios');

exports.AuthPlugin = function(app_remote, client_id, client_secret, auth_server_remote, ucenter_server_remote) {
  const search_params_str = window.location.search;
  if (search_params_str) {
    const code = window.location.search.split('?')[1].split('&')[0].split('=')[1];
    const request_params = {
      client_id,
      client_secret,
      'redirect_uri': app_remote,
      code
    };
    const url = `${ucenter_server_remote}/api/ucenter/access_token?code=${request_params.code}&client_id=${request_params.client_id}&redirect_uri=${request_params.redirect_uri}&client_secret=${request_params.client_secret}`;
    console.log(url);
    let obj = new XMLHttpRequest();
    if(window.ActiveXObject) {
      obj= new ActiveXObject("Microsoft.XMLHTTP");
    }else if (window.XMLHttpRequest) {
      obj= new XMLHttpRequest();
    }else {
      obj= null;
    }
    obj.open("POST", url);
    obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
    obj.onreadystatechange = function () {
      if (obj.readyState === 4 && (obj.status === 200 || obj.status === 304)) {  // 304未修改
        console.log(obj.responseText);
        console.log("认证结果",JSON.parse(obj.responseText));
        const data=JSON.parse(obj.responseText);
        localStorage.access_token = JSON.stringify(data.data.access_token);
        localStorage.user = JSON.stringify(data.data.user);
        location.href = app_remote;
      }
    };
    obj.send();
  } else {
    if (localStorage.access_token === 'undefined' || !localStorage.access_token) {
      window.location.href = auth_server_remote + '/auth/ticket?redirect_uri=' + app_remote + '&client_id=' + client_id;
    }
  }
};
