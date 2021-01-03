/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import TimeSelector from '../../commons/TimeSelector';
import '../../less/compare/conditions.less';

const EventEmitter = require('events').EventEmitter;

class Conditions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.emitter.on('changeTime', this.changeTime.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      emitter: nextProps.emitter,
      caseCauses: nextProps.caseCauses
    });
  }
  // 改变时间刷新法官对比页面
  changeTime =({ startTime, endTime, quickTime }) => {
    const form = this.$store.state.compareForm;
    Object.assign(form, { startTime, endTime, quickTime });
    this.$store.state.compareForm = form;
    this.state.emitter.emit('loading');
    this.$api.compare.judgeCompare.request(this.$store.state.compareForm).then((result) => {
      this.state.emitter.emit('done', result.data.data);
    });
  };
  // 改变案由刷新法官对比页面
  changeCause =(e) => {
    const form = this.$store.state.compareForm;
    Object.assign(form, { caseCauseId: e.target.value });
    this.$store.state.compareForm = form;
    this.state.emitter.emit('loading');
    this.$api.compare.judgeCompare.request(this.$store.state.compareForm).then((result) => {
      this.state.emitter.emit('done', result.data.data);
    });
  };
  downLoad() {
    this.$api.compare.download.request(this.$store.state.compareForm).then((result) => {
      window.open(result.config.url);
    });
  }
  render() {
    const { caseCauses, dateShow } = this.props;
    return (<div className="compare_options_div" >
      <form className="options" id="compare-form">
        <TimeSelector show={dateShow} emitter={this.emitter} />
        <div className="option">
          <select id="caseCauseId" name="caseCauseId" onChange={this.changeCause}>
            <option value="">全部案由</option>
            {caseCauses.map((item, index) => {
              const list = [];
              list.push(<option
                key={index}
                value={item.id}
              >{item.name}</option>);
              return list;
            })}
          </select>
        </div>
        <div
          className="down_excel"
          onClick={this.downLoad.bind(this)}
        ><img alt="" src={require('../../assets/commons/excel.png')} />导出excel
        </div>
      </form>
    </div>);
  }
}
// Conditions.propTypes = {
//   caseCauses: React.PropTypes.array.isRequired,
//   dateShow: React.PropTypes.bool.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Conditions;
