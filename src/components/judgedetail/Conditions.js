/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import TimeSelector from '../../commons/TimeSelector';
import '../../less/judgedetail/conditions.less';

const EventEmitter = require('events').EventEmitter;

class Conditions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      proceedingTypes: [
        { id: 1, name: '一审' },
        { id: 2, name: '二审' },
        { id: 3, name: '再审' },
        { id: 0, name: '其他' }
      ],
      docTypes: [
        { id: 1, name: '判决书' },
        { id: 2, name: '裁定书' },
        { id: 3, name: '决定书' },
        { id: 4, name: '通知书' },
        { id: 5, name: '调解书' },
        { id: 0, name: '其他' }
      ]
    };
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.emitter.on('changeTime', this.changeTime.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      emitter: nextProps.emitter
    });
  }
  // 改变时间刷新法官审务单
  changeTime =({ startTime, endTime, quickTime }) => {
    const form = this.$store.state.judgeForm;
    Object.assign(form, { startTime, endTime, quickTime });
    this.$store.state.judgeForm = form;
    this.state.emitter.emit('refresh');
  };
  // 改变案由刷新法官审务单
  changeCause =(e) => {
    const form = this.$store.state.judgeForm;
    Object.assign(form, { caseCauseId: e.target.value });
    this.$store.state.judgeForm = form;
    this.state.emitter.emit('refresh');
  };
  // 改变审理程序刷新法官审务单
  changeProceeding =(e) => {
    const form = this.$store.state.judgeForm;
    Object.assign(form, { proceeding: e.target.value });
    this.$store.state.judgeForm = form;
    this.state.emitter.emit('refresh');
  };
  // 改变文书类型刷新法官审务单
  changeDocType =(e) => {
    const form = this.$store.state.judgeForm;
    Object.assign(form, { docType: e.target.value });
    this.$store.state.judgeForm = form;
    this.state.emitter.emit('refresh');
  };
  render() {
    const { caseCauses, dateShow } = this.props;
    const { docTypes, proceedingTypes } = this.state;
    return (<div id="conditions">
      <div className="title" />
      <div className="option">
        <select id="caseCauseId" name="caseCauseId" onChange={this.changeCause}>
          <option value="">全部案由</option>
          {caseCauses.map((item, index) => {
            const options = [];
            options.push(<option key={index} value={item.id}>{item.name}</option>);
            return options;
          })}
        </select>
      </div>
      <div className="option time-wrapper">
        <TimeSelector emitter={this.emitter} show={dateShow} />
      </div>
      <div className="option">
        <select id="procceding" name="proceeding" onChange={this.changeProceeding}>
          <option value="">全部审理程序</option>
          {proceedingTypes.map((item, index) => {
            const options = [];
            options.push(<option key={index} value={item.id}>{item.name}</option>);
            return options;
          })}
        </select>
      </div>
      <div className="option">
        <select id="docType" name="docType" onChange={this.changeDocType}>
          <option value="">全部文书类型</option>
          {docTypes.map((item, index) => {
            const options = [];
            options.push(<option key={index} value={item.id}>{item.name}</option>);
            return options;
          })}
        </select>
      </div>
    </div>);
  }
}
export default Conditions;
