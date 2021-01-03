/**
 * Created by frank on 2017/7/18.
 */
import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import Component from '../constants/Component';
import '../less/commons/timeselector.less';

const now = moment().format('YYYY-MM-DD');
const threeMon = moment().subtract(3, 'months').format('YYYY-MM-DD');
const sixMon = moment().subtract(6, 'months').format('YYYY-MM-DD');
const oneYear = moment().subtract(1, 'years').format('YYYY-MM-DD');
const threeYear = moment().subtract(3, 'years').format('YYYY-MM-DD');

class TimeSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dateShow: false,
      quickTime: '',
      startValue: '',
      startTime: '',
      endValue: '',
      endTime: '',
      displayTimes: [
        { title: '不限时间', startTime: '', endTime: '', quickTime: '' },
        { title: '三个月内', startTime: threeMon, endTime: now, quickTime: 6 },
        { title: '半年内', startTime: sixMon, endTime: now, quickTime: 7 },
        { title: '一年内', startTime: oneYear, endTime: now, quickTime: 8 },
        { title: '三年内', startTime: threeYear, endTime: now, quickTime: 9 },
        { title: '2016年度', startTime: '2016-01-01', endTime: '2016-12-31', quickTime: 10 }
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dateShow: nextProps.show
    });
  }
  setQuickTimeType = (item, index, emitter) => {
    this.$store.state.displayTime = this.state.displayTimes[index].title;
    emitter.emit('changeTime', { startTime: item.startTime, endTime: item.endTime, quickTime: this.state.displayTimes[index].quickTime });
    this.toggleDateShow();
  };
  setCommonTime = (emitter) => {
    let startTime = this.state.startTime;
    let endTime = this.state.endTime;
    if (startTime) {
      startTime = moment(startTime).format('YYYY-MM-DD');
    }
    if (endTime) {
      endTime = moment(endTime).format('YYYY-MM-DD');
    }
    if (!startTime && endTime) {
      this.$store.state.displayTime = `${moment(endTime).format('YYYY-MM')}之前`;
    }
    if (startTime && !endTime) {
      this.$store.state.displayTime = `${moment(startTime).format('YYYY-MM')}之后`;
    }
    if (startTime && endTime) {
      this.$store.state.displayTime = `${moment(startTime).format('YYYY-MM')}到${moment(endTime).format('YYYY-MM')}`;
    }
    if (!startTime && !endTime) {
      this.$store.state.displayTime = this.state.displayTimes[0].title;
    }
    emitter.emit('changeTime', { startTime, endTime, quickTime: '' });
    this.setState({
      dateShow: !this.state.dateShow
    });
  };
  toggleDateShow = () => {
    this.setState({
      dateShow: !this.state.dateShow
    });
  };
  handleStartChange = (value) => {
    this.setState({
      startValue: value,
      startTime: value
    });
  };
  handleEndChange = (value) => {
    this.setState({
      endValue: value,
      endTime: value
    });
  };
  render() {
    const { displayTimes, dateShow, startValue, endValue } = this.state;
    const { emitter } = this.props;
    return (
      <div className="time">
        <span
          className="select"
          id="time-select"
          style={{ overflow: 'hidden' }}
          onClick={this.toggleDateShow.bind(this)}
        >{this.$store.state.displayTime}</span>
        <img
          className="time-select"
          alt=""
          src={require('../assets/commons/show_time_options.png')}
          onClick={this.toggleDateShow.bind(this)}
        />
        {dateShow ? <ul className="date_wrapper" style={{ zIndex: 999 }}>
          {displayTimes.map((item, index) => {
            const list = [];
            list.push(<li>
              <a className="time_item" onClick={this.setQuickTimeType.bind(this, item, index, emitter)}>{item.title}</a>
            </li>);
            return list;
          })}
          <li>
            <span className="time_item">自定义</span>
          </li>
          <div className="datepicker_wrapper">
            从 <DatePicker className="time_item" onChange={this.handleStartChange} value={startValue} />
          </div>
          <div className="datepicker_wrapper">
            至 <DatePicker className="time_item" onChange={this.handleEndChange} value={endValue} />
          </div>
          <li style={{ textAlign: 'center', marginBottom: '10px', marginTop: '-5px' }}>
            <input className="time_item" type="button" value="确定" onClick={this.setCommonTime.bind(this, emitter)} />
          </li>
        </ul> : null}
      </div>
    );
  }
}
// TimeSelector.propTypes = {
//   emitter: React.PropTypes.any.isRequired,
//   show: React.PropTypes.bool.isRequired
// };
export default TimeSelector;
