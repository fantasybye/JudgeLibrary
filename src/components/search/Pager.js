/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import Pagination from '../../commons/Pagination';
import '../../less/search/pager.less';

const EventEmitter = require('events').EventEmitter;

class Pager extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pager: {
        currentpage: 1,
        pagecount: 0,
        count: 0,
        limit: 0
      },
      isChecked: 0,
      emitter: null,
      limits: [8, 16, 40]
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    this.emitter.on('changePage', this.callback.bind(this));
    this.pagerInit(this.props);
  }
  setCheck = (index) => {
    this.setState({
      isChecked: index
    });
  };
  pagerInit = (props) => {
    const index = this.state.limits.indexOf(props.pager.limit);
    this.setState({
      emitter: props.emitter,
      isChecked: index,
      pager: props.pager
    });
  };
  // 分页请求
  callback = (page) => {
    const emitter = this.state.emitter;
    const pager = this.state.pager;
    Object.assign(pager, { currentpage: page });
    Object.assign(this.$store.state.searchForm, pager);
    emitter.emit('loading');
    this.$api.judge.search.request(this.$store.state.searchForm).then(({ data }) => {
      emitter.emit('done', data.data);
      this.setState({
        pager
      });
    });
  };
  checkLimit = (index, emitter) => {
    const { pager, limits } = this.state;
    this.setCheck(index);
    pager.limit = limits[index];
    Object.assign(this.$store.state.searchForm, pager);
    emitter.emit('loading');
    this.$api.judge.search.request(this.$store.state.searchForm).then(({ data }) => {
      emitter.emit('done', data.data);
      this.setState({
        pager
      });
    });
  };
  render() {
    const { limits, isChecked } = this.state;
    const { emitter, pager } = this.props;
    return (
      <div>
        <div className="pager">
          <div className="page_limit_setting">
            <label className="">每页显示：</label>
            {limits.map((value, index) => {
              const inputs = [];
              inputs.push(<input
                key={index}
                type="button"
                value={value}
                className={isChecked === index ? 'checked' : ''}
                onClick={this.checkLimit.bind(this, index, emitter)}
              />);
              return inputs;
            })}
          </div>
        </div>
        <Pagination
          current={pager.currentpage}
          allPage={pager.pagecount}
          allCount={pager.count}
          emitter={this.emitter}
        />
      </div>
    );
  }
}
export default Pager;
