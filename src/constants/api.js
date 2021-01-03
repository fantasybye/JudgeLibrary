/* eslint-disable camelcase*/
import 'babel-polyfill';
import axios from 'axios';
import { define } from './api_helper';
// import { AuthPlugin } from './utils';
// import { client_id, client_secret, auth_server_remote, ucenter_server_remote } from '../../config';

const config = require('../../config');

const serviceHost = process.env.NODE_ENV === 'production'
  ? config.build.serviceHost
  : config.dev.serviceHost;
// const app_remote = process.env.NODE_ENV === 'production'
//   ? config.build.app_remote
//   : config.dev.app_remote;
// const app_remote = 'http://192.168.11.151:3000/'; // 'http://judge.aegis-info.com/'; // 'http://192.168.11.88:8666/#/';
// const serviceHost = 'http://192.168.11.151:7070'; // 'judgeRepository';
// const serviceHost = 'http://192.168.11.171:7070';
axios.defaults.baseURL = serviceHost; // 'judgeRepository'; //
const loginUrl = 'http://192.168.11.88:7012';
const apiObject = {
  login: {
    url: `${loginUrl}/api/decision_result/signin?axios=1`,
    method: 'post'
  },
  home: {
    // 获取全省各市人均办案量地图
    mapChart: {
      url: '/judge/home/map_chart',
      method: 'get',
      isFormData: true
    },
    // 获取输入框提示
    suggest: {
      url: '/judge/suggest',
      method: 'get',
      isFormData: true
    },
    // 获取全省法官信息
    judges: {
      url: '/judge/home',
      method: 'get',
      isFormData: true
    },
    judgeRecommend: {
      url: '/judge/home/recommend_judge',
      method: 'get',
      isFormData: true
    },
    evaluation: {
      url: '/judge/home/evaluation',
      method: 'get',
      isFormData: true
    },
    trendChart: {
      url: '/judge/home/trend_chart',
      method: 'get',
      isFormData: true
    },
    starChart: {
      url: '/judge/home/star_chart',
      method: 'get',
      isFormData: true
    }
  },
  judge: {
    search: {
      url: '/judge/search',
      isFormData: false,
      method: 'get'
    },
    star: {
      url: '/judge/star_comment',
      isFormData: false,
      method: 'get'
    },
    detail: {
      method: 'get',
      url: '/judge/detail'
    },
    goodAt: {
      url: '/judge/detail/good_at_chart',
      method: 'get'
    },
    complexityWhole: {
      url: '/judge/detail/complexity_whole',
      isFormData: false,
      method: 'get'
    },
    complexityFocus: {
      url: '/judge/detail/complexity_focus',
      isFormData: false,
      method: 'get'
    },
    trend: {
      url: '/trend/judge/trend_chart',
      isFormData: false,
      method: 'get'
    }
  },
  case: {
    caseWeight: {
      url: '/case/case_weight_and_complexity',
      method: 'get',
      isFormData: true
    },
    detail: {
      url: '/case/case_detail',
      method: 'get',
      isFormData: true
    }
  },
  compare: {
    judgeCompare: {
      url: '/judge/compare',
      method: 'get',
      isFormData: true
    },
    download: {
      url: '/judge/compare/download',
      method: 'get',
      isFormData: true
    }
  },
  detail: {
    listComments: {
      url: '/judge/detail/list_comments',
      method: 'get',
      ifFormData: true
    },
    submitComment: {
      url: '/judge/detail/add_comment',
      method: 'post',
      isFormData: true
    },
    abilityChart: {
      url: '/judge/detail/ability',
      method: 'get',
      ifFormData: true
    },
    trendChart: {
      url: '/judge/detail/trend_chart',
      method: 'get',
      isFormData: true
    },
    statusChart: {
      url: '/judge/detail/different_status',
      method: 'get',
      isFormData: true
    },
    complexChart: {
      url: '/judge/detail/complexity_procedure',
      method: 'get',
      isFormData: true
    },
    showExample: {
      url: '/judge/detail/show_example',
      method: 'get',
      isFormData: true
    },
    caseChart: {
      url: '/judge/detail/trial_histogram',
      method: 'get',
      isFormData: true
    },
    reasonChart: {
      url: '/judge/detail/reasonLength_histogram',
      method: 'get',
      isFormData: true
    },
    docTypeChart: {
      url: '/judge/detail/docLength_histogram',
      method: 'get',
      isFormData: true
    }
  }
};
// AuthPlugin(app_remote, client_id, client_secret, auth_server_remote, ucenter_server_remote);
// const token = localStorage.access_token;
export default define(apiObject);
// , { headers: { common: { token } } }
