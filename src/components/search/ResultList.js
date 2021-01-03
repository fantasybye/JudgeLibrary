/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import Component from '../../constants/Component';
import Compare from '../../components/search/Compare';
import JudgeListItem from './JudgeListItem';
import '../../less/search/resultlist.less';

const EventEmitter = require('events').EventEmitter;

class ResultList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      compareJudgeList: [],
      compareIds: [],
      checked: 0
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    this.emitter.on('addCompare', this.addCompare.bind(this));
    this.emitter.on('deleteCompare', this.deleteCompare.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.setChecked(nextProps.checked);
  }
  setChecked = (checked) => {
    this.setState({
      checked
    });
  };
  addCompare = (id, name) => {
    const { compareJudgeList, compareIds } = this.state;
    if (compareJudgeList.findIndex(row => row.id === id) === -1) {
      compareIds.push(id);
      compareJudgeList.push({
        id,
        name
      });
      this.setState({
        compareJudgeList,
        compareIds
      });
    }
  };
  deleteCompare = (id) => {
    const { compareJudgeList, compareIds } = this.state;
    const arrIndex = compareJudgeList.findIndex(row => row.id === id);
    compareJudgeList.splice(arrIndex, 1);
    compareIds.splice(arrIndex, 1);
    this.setState({
      compareJudgeList,
      compareIds
    });
  };
  render() {
    const { searchData, loading, emitter, sortOptions } = this.props;
    const { checked } = this.state;
    return (
      <div className="result_list">
        <div className="sort_div">
          <div className="sort_title">排序方式：</div>
          <div className="sort_options">
            {sortOptions.map((sort, index) => {
              const sorts = [];
              sorts.push(
                <div key={index} className="sort_option">
                  <label className={checked === index ? 'checked' : ''}>
                    <input
                      name="sortOption"
                      type="radio"
                      style={{ display: 'none' }}
                      value={sort.value}
                      onClick={() => { emitter.emit('check', index);this.setChecked.bind(this, index); }}
                    />
                    <span>{sort.name}</span>
                  </label>
                </div>);
              return sorts;
            })}
          </div>
          <div className="total">
            总共找到
            <span className="count">
              {searchData.pager ? searchData.pager.count : 0}
            </span>
            个结果</div>
        </div>
        <div className="list_div">
          {(!searchData.judges || searchData.judges === null || searchData.judges.length === 0) && !loading ? <div className="no_data">
            <img alt="" src={require('../../assets/search/no_search_result.png')} />
          </div> :
            (loading ? <div className="loading">
              <Spin size="large" />
            </div> : <ul>
              {searchData.judges.map((judge, index) => {
                const lists = [];
                lists.push(<JudgeListItem key={index} judge={judge} emitter={this.emitter} />);
                return lists;
              })}
            </ul>)}
        </div>
        {/* 对比选项*/}
        <div className="compare_div">
          <Compare
            compareJudgeList={this.state.compareJudgeList}
            compareIds={this.state.compareIds}
            emitter={this.emitter}
          />
        </div>
      </div>
    );
  }
}
export default ResultList;
