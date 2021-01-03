/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import Component from '../constants/Component';
import Header from '../commons/Header';
import Toast from '../commons/Toast';
import Star from '../components/comment/Star';
import Table from '../components/comment/Table';
import '../less/comment/starcomment.less';

const EventEmitter = require('events').EventEmitter;

class StarComment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: null,
      loading: true,
      commentDateShow: false,
      starData: []
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    const element = document.getElementById('judge_comment_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.attachEvent('onclick', this.showDate.bind(this));
    } else {
      element.addEventListener('click', this.showDate.bind(this));
    }
    this.emitter.on('loading', this.commentLoadingOn.bind(this));
    this.emitter.on('done', this.commentLoadingDone.bind(this));
    this.emitter.on('clear', this.clear.bind(this));
    const url = document.location.href;
    if (url.indexOf('?') !== -1) {
      const search = window.location.hash.split('?')[1];
      const id = search ? search.split('&')[0].split('=')[1] : '';
      this.getData(id);
    }
  }
  componentWillUnmount() {
    const element = document.getElementById('judge_comment_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.detachEvent('onclick', this.showDate.bind(this));
    } else {
      element.removeEventListener('click', this.showDate.bind(this));
    }
  }
  getData = (judgeId) => {
    Object.assign(this.$store.state.commentForm, { judgeId });
    this.$api.judge.star.request(this.$store.state.commentForm).then(({ data }) => {
      this.setState({
        loading: false,
        starData: data.data
      });
    }).catch((err) => {
      console.log(err); // eslint-disable-line
      this.setState({
        loading: false,
        starData: {},
        message: { text: '哎呀！出错啦！请刷新试试！', type: 'error' }
      });
    });
  };
  showDate = () => {
    if (event.target.className) {
      const className = event.target.className;
      if ((className !== 'date_wrapper'
          && className !== 'time-select'
          && className !== 'select'
          && className !== 'time_item'
          && className !== 'ant-calendar-picker-input ant-input'
          && className !== 'ant-calendar-picker-icon')) {
        this.setState({
          commentDateShow: false
        });
      }
    }
  };
  clear = () => {
    this.setState({
      message: null
    });
  };
  commentLoadingOn = () => {
    this.setState({
      loading: true
    });
  };
  commentLoadingDone = (data) => {
    this.setState({
      loading: false,
      starData: data
    });
  };
  render() {
    const { message, loading, starData, commentDateShow } = this.state;
    const showToast = !!message;
    return (<div id="judge_comment_wrapper">
      <Header>
        <span className="star-header">
          法官星级评价结果
        </span>
      </Header>
      {showToast ? <Toast text={message.text} timeout={2000} type={message.type} emitter={this.emitter} /> : null}
      {loading ? <div className="loading">
        <Spin size="large" />
      </div> : null}
      {!loading ? <Star starData={starData} showDate={commentDateShow} emitter={this.emitter} /> : null}
      {!loading ? <Table starData={starData} /> : null}
    </div>);
  }
}
export default StarComment;
