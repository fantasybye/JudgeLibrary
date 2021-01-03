/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import Crumb from '../../commons/Crumb';
import TimeSelector from '../../commons/TimeSelector';
import '../../less/search/conditions.less';

const EventEmitter = require('events').EventEmitter;

class Conditions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: {
        keywordSet: [],
        departmentList: [],
        courtList: [],
        caseCauseList: [],
        judgeList: []
      },
      emitter: null
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    this.emitter.on('changeTime', this.changeTime.bind(this));
    this.emitter.on('changeConditions', this.changeList.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      emitter: nextProps.emitter,
      list: nextProps.list
    });
  }
  changeTime =({ startTime, endTime, quickTime }) => {
    const form = this.$store.state.searchForm;
    Object.assign(form, { startTime, endTime, quickTime, currentpage: 0 });
    this.$store.state.searchForm = form;
    this.state.emitter.emit('loading');
    // 改变时间刷新法官列表页面
    this.$api.judge.search.request(this.$store.state.searchForm).then((result) => {
      this.state.emitter.emit('done', result.data.data);
    });
  };
  changeList = (index, itemForm, itemList) => {
    let arrIndex;
    const list = this.state.list;
    if (itemList === 'keywordSet') {
      arrIndex = this.$store.state.searchForm[itemForm].indexOf(list[itemList][index]);
    } else {
      arrIndex = this.$store.state.searchForm[itemForm].indexOf(list[itemList][index].id);
    }
    this.$store.state.searchForm[itemForm].splice(arrIndex, 1);
    this.state.emitter.emit('loading');
    // 改变面包屑选项刷新法官列表页面
    this.$api.judge.search.request(this.$store.state.searchForm).then((result) => {
      this.state.emitter.emit('done', result.data.data);
    });
  };
  render() {
    const { list } = this.state;
    const { showDate } = this.props;
    return (
      <div className="options_div">
        <div className="center">
          <div className="condition_title">搜索条件:</div>
          <div id="options">
            {list.keywordSet.map((keyword, index) => {
              const crumbs = [];
              crumbs.push(<Crumb
                emitter={this.emitter}
                text={keyword}
                key={index}
                index={index}
                form="keywords"
                list="keywordSet"
              />);
              return crumbs;
            })}
            {list.departmentList.map((department, index) => {
              const crumbs = [];
              crumbs.push(<Crumb
                emitter={this.emitter}
                text={`部门：${department.name}`}
                key={index}
                index={index}
                form="department"
                list="departmentList"
              />);
              return crumbs;
            })}
            {list.courtList.map((court, index) => {
              const crumbs = [];
              crumbs.push(<Crumb
                emitter={this.emitter}
                text={`法院：${court.name}`}
                key={index}
                index={index}
                form="court"
                list="courtList"
              />);
              return crumbs;
            })}
            {list.caseCauseList.map((caseCause, index) => {
              const crumbs = [];
              crumbs.push(<Crumb
                emitter={this.emitter}
                text={`案由：${caseCause.name}`}
                key={index}
                index={index}
                form="caseCause"
                list="caseCauseList"
              />);
              return crumbs;
            })}
            {list.judgeList.map((judge, index) => {
              const crumbs = [];
              crumbs.push(<Crumb
                emitter={this.emitter}
                text={`法官：${judge.name}`}
                key={index}
                index={index}
                form="judge"
                list="judgeList"
              />);
              return crumbs;
            })}
          </div>
          <TimeSelector show={showDate} emitter={this.emitter} />
        </div>
      </div>
    );
  }
}
// Conditions.propTypes = {
//   emitter: React.PropTypes.any.isRequired,
//   list: React.PropTypes.object.isRequired,
//   showDate: React.PropTypes.bool.isRequired
// };
export default Conditions;
