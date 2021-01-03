/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import '../../less/search/compare.less';

class Compare extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  deleteCompareJudge = (id, emitter) => {
    emitter.emit('deleteCompare', id);
  };
  render() {
    const { compareJudgeList, compareIds, emitter } = this.props;
    return (
      <div>
        <div id="compare_list">
          <div className="list-head">
            <img alt="" src={require('../../assets/search/compare_list.png')} />
            <span className="list-table">对比列表</span>
          </div>
          {compareJudgeList.map((judge, index) => {
            const list = [];
            list.push(<div className="list-item" key={index}>
              <span className="name">{judge.name}</span>
              <span className="delete c-p" onClick={this.deleteCompareJudge.bind(this, judge.id, emitter)}>X</span>
            </div>);
            return list;
          })}
        </div>
        {compareJudgeList.length >= 2 ? <div id="compare_btn" className="c-p">
          <a
            onClick={() => {
              window.open(`${window.location.href.split('#')[0]}#/judge_compare?compareIds=${compareIds}`);
            }}
            target="_blank"
          >开始对比</a>
        </div> : null}
      </div>
    );
  }
}
// Compare.propTypes = {
//   compareJudgeList: React.PropTypes.array.isRequired,
//   compareIds: React.PropTypes.array.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Compare;
