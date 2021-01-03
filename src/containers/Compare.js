/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../constants/Component';
import Table from '../components/compare/Table';
import Conditions from '../components/compare/Conditions';
import Header from '../commons/Header';
import '../less/compare/conditions.less';


const EventEmitter = require('events').EventEmitter;

class Compare extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      compareLoading: true,
      judges: [],
      caseCauses: [],
      compareDateShow: false
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    const element = document.getElementById('judge_compare_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.attachEvent('onclick', this.showDate.bind(this));
    } else {
      element.addEventListener('click', this.showDate.bind(this));
    }
    this.emitter.on('loading', this.compareLoadingOn.bind(this));
    this.emitter.on('done', this.compareLoadingDone.bind(this));
    const url = document.location.href;
    if (url.indexOf('?') !== -1) {
      const search = window.location.hash.split('?')[1];
      const id = search ? search.split('&')[0].split('=')[1] : '';
      this.getData(id);
    }
  }
  componentWillUnmount() {
    const element = document.getElementById('judge_compare_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.detachEvent('onclick', this.showDate.bind(this));
    } else {
      element.removeEventListener('click', this.showDate.bind(this));
    }
  }
  getData = (id) => {
    this.$api.compare.judgeCompare.request(Object.assign(this.$store.state.compareForm, { compareIds: id }))
      .then(({ data }) => {
        if (data.code === 0) {
          this.setState({
            compareLoading: false,
            judges: data.data.result,
            caseCauses: data.data.caseCauses
          });
        }
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
          compareDateShow: false
        });
      }
    }
  };
  compareLoadingOn = () => {
    this.setState({
      compareLoading: true
    });
  };
  compareLoadingDone = (data) => {
    this.setState({
      compareLoading: false,
      caseCauses: data.caseCauses,
      judges: data.result
    });
  };
  render() {
    const { judges, compareLoading, caseCauses, compareDateShow } = this.state;
    return (<div id="judge_compare_wrapper">
      <Header>
        <span className="detail-header">
          法官详细信息对比
        </span>
      </Header>
      <Conditions caseCauses={caseCauses} dateShow={compareDateShow} emitter={this.emitter} />
      <Table judges={judges} compareLoading={compareLoading} emitter={this.emitter} />
    </div>);
  }
}
export default Compare;
