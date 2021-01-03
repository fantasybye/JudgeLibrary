/*
 * Created by frank on 2017/7/16.
 */
import React from 'react';
import Component from '../constants/Component';
import Toast from '../commons/Toast';
import SearchHeader from '../components/search/SearchHeader';
import Conditions from '../components/search/Conditions';
import ResultList from '../components/search/ResultList';
import Pager from '../components/search/Pager';
import '../less/search/search.less';

const EventEmitter = require('events').EventEmitter;

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
      searchData: {
        pager: {
          currentpage: 1,
          pagecount: 0,
          count: 0,
          limit: 8
        },
        judgeList: [],
        judges: [],
        departmentList: [],
        courtList: [],
        keywordSet: [],
        caseCauseList: [],
        compareJudges: []
      },
      searchDateShow: false,
      checked: 0,
      sortOptions: [
        { value: '', name: '综合排序' },
        { value: 'trialCount', name: '办案数量' },
        { value: 'workload', name: '工作量' },
        { value: 'docLength', name: '文书数量' },
        { value: 'reasonLength', name: '说理长度' }
      ],
      searchLoading: true
    };
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.searchLoadingOn();
    this.emitter.on('clear', this.clear.bind(this));
    this.emitter.on('loading', this.searchLoadingOn.bind(this));
    this.emitter.on('done', this.searchLoadingDone.bind(this));
    this.emitter.on('error', this.errorMessage.bind(this));
    this.emitter.on('check', this.check.bind(this));
    this.emitter.on('refresh', this.refresh.bind(this));
    this.refresh();
  }
  componentDidMount() {
    const element = document.getElementById('search_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.attachEvent('onclick', this.showDate.bind(this));
    } else {
      element.addEventListener('click', this.showDate.bind(this));
    }
  }
  componentWillUnmount() {
    const element = document.getElementById('search_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.detachEvent('onclick', this.showDate.bind(this));
    } else {
      element.removeEventListener('click', this.showDate.bind(this));
    }
  }
  showDate = () => {
    if (event.target.className) {
      const className = event.target.className;
      if (className !== 'date_wrapper'
        && className !== 'time-select'
        && className !== 'select'
        && className !== 'time_item'
        && className !== 'ant-calendar-picker-input ant-input'
        && className !== 'ant-calendar-picker-icon') {
        this.setState({
          searchDateShow: false
        });
      }
    }
  };
  refresh = () => {
    const index = this.state.sortOptions.findIndex(row => row.value === this.$store.state.searchForm.sortOption);
    const checked = index === -1 ? 0 : index;
    this.check(checked);
  };
  check = (index) => {
    this.searchLoadingOn();
    this.$store.state.searchForm.currentpage = 1;
    this.$store.state.searchForm.sortOption = this.state.sortOptions[index].value;
    this.$api.judge.search.request(this.$store.state.searchForm).then(({ data }) => {
      if (data.code !== 0) {
        const message = { text: data.msg, type: 'error' };
        this.errorMessage(message);
      }
      this.setState({
        checked: index,
        searchLoading: false,
        searchData: data.data
      });
    });
  };
  errorMessage = (message) => {
    this.setState({
      message
    });
  };
  searchLoadingOn = () => {
    this.setState({
      searchLoading: true
    });
  };
  searchLoadingDone = (data) => {
    this.setState({
      searchLoading: false,
      searchData: data
    });
  };
  // 清空提示消息
  clear = () => {
    this.setState({
      message: null
    });
  };
  render() {
    const { message, searchData, searchLoading, sortOptions, checked, searchDateShow } = this.state;
    const showToast = !!message;
    return (
      <div id="search_wrapper">
        {showToast ? <Toast
          text="我打一句话用来测试"
          timeout={2000}
          type="success"
          color={{ background: 'red', text: 'white' }}
          emitter={this.emitter}
        /> : null}
        <SearchHeader emitter={this.emitter} />
        <Conditions emitter={this.emitter} list={searchData} showDate={searchDateShow} />
        <ResultList
          searchData={searchData}
          loading={searchLoading}
          emitter={this.emitter}
          checked={checked}
          sortOptions={sortOptions}
        />
        {/* 分页*/}
        {searchData.pager && searchData.pager.count ? <div className="pager_div" >
          <Pager pager={searchData.pager} emitter={this.emitter} />
        </div> : null}
      </div>
    );
  }
}
export default Search;

