/*
 * Created by frank on 2017/7/11.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import Component from '../../constants/Component';
import '../../less/home/search.less';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: -1,
      keywords: '',
      conditions: [], // conditions数组用于弹出框内展示的数据
      sources: []
    };
  }
  componentWillUnmount() {
    this.$store.state.searchForm.keywords = [];
  }
  // 搜索框获取焦点
  focus = () => {
    const keywords = this.state.keywords;
    this.$store.state.homeDisplay = keywords !== '';
  };
  blur = () => {
    const count = -1;
    this.setState({
      count
    });
  };
  // 添加form数据
  itemSelected = (key, item) => {
    const keywords = '';
    const conditions = this.state.conditions;
    if (JSON.stringify(conditions).indexOf(JSON.stringify(item)) === -1) {
      conditions.push(item);
      this.$store.state.homeDisplay = false;
    }
    if (key === '案由' && this.$store.state.searchForm.caseCause.indexOf(item.id) === -1) {
      this.$store.state.searchForm.caseCause.push(item.id);
    }
    if (key === '法院' && this.$store.state.searchForm.court.indexOf(item.id) === -1) {
      this.$store.state.searchForm.court.push(item.id);
    }
    if (key === '法官' && this.$store.state.searchForm.judge.indexOf(item.id) === -1) {
      this.$store.state.searchForm.judge.push(item.id);
    }
    if (key === '部门' && this.$store.state.searchForm.department.indexOf(item.id) === -1) {
      this.$store.state.searchForm.department.push(item.id);
    }
    this.setState({
      keywords,
      conditions
    });
  };
  // 监听搜索框变化
  watchKeywords = (keywords) => {
    if (keywords !== '') {
      this.$store.state.homeDisplay = true;
      this.$api.home.suggest.request({
        keyword: keywords,
        eventsId: this.$store.state.user.eventsId
      }).then(({ data }) => {
        if (data.code === 0) {
          const newSources = data.data;
          let count = -1;
          Object.values(newSources).forEach(source => (
            count += source.length
          ));
          this.setState({
            sources: newSources,
            count
          });
        }
      });
    } else {
      this.$store.state.homeDisplay = false;
    }
  };
  // 按下回车操作
  keyDown = () => {
    let keywords = this.state.keywords;
    const count = this.state.count;
    const conditions = this.state.conditions;
    if (keywords.trim().length > 0 && count === -1) {
      conditions.push({
        type: 'keywords',
        typeName: '关键词',
        id: keywords,
        name: keywords
      });
      this.$store.state.searchForm.keywords.push(keywords.toString());
      keywords = '';
      this.setState({
        keywords,
        conditions
      });
    } else if (keywords.trim().length === 0) {
      HashLocation.push('/judge_search');
    }
  };
  // 删除form数据
  removeCondition = (type, condition, index) => {
    const count = -1;
    const conditions = this.state.conditions;
    conditions.splice(index, 1);
    this.setState({
      conditions,
      count
    });
    if (type === 'judge') {
      for (let i = 0;i < this.$store.state.searchForm.judge.length;i += 1) {
        if (condition.id === this.$store.state.searchForm.judge[i]) {
          this.$store.state.searchForm.judge.splice(i, 1);
        }
      }
    }
    if (type === 'caseCause') {
      for (let i = 0;i < this.$store.state.searchForm.caseCause.length;i += 1) {
        if (condition.id === this.$store.state.searchForm.caseCause[i]) {
          this.$store.state.searchForm.caseCause.splice(i, 1);
        }
      }
    }
    if (type === 'court') {
      for (let i = 0;i < this.$store.state.searchForm.court.length;i += 1) {
        if (condition.id === this.$store.state.searchForm.court[i]) {
          this.$store.state.searchForm.court.splice(i, 1);
        }
      }
    }
    if (type === 'department') {
      for (let i = 0;i < this.$store.state.searchForm.department.length;i += 1) {
        if (condition.id === this.$store.state.searchForm.department[i]) {
          this.$store.state.searchForm.department.splice(i, 1);
        }
      }
    }
    if (type === 'keywords') {
      for (let i = 0;i < this.$store.state.searchForm.keywords.length;i += 1) {
        if (condition.name === this.$store.state.searchForm.keywords[i]) {
          this.$store.state.searchForm.keywords.splice(i, 1);
        }
      }
    }
  };
  // 跳转页面
  search = () => {
    this.keyDown.bind(this);
    HashLocation.push('/judge_search');
  };
  render() {
    const { conditions, sources } = this.state;
    return (
      <div className="search">
        <div className="conditions">
          <ul className="selected-conditions clearfix">
            {conditions.map((condition, i) => (
              <li key={i} className={`type-${condition.type}`} >
                <label>{condition.name}</label>
                <img
                  alt=""
                  className="remove"
                  src={require('../../assets/home/search/icon_delete.png')}
                  onClick={this.removeCondition.bind(this, condition.type, condition, i)}
                />
                <input form="search-form" type="hidden" name={condition.type} value={condition.id} />
              </li>
            ))}
          </ul>
        </div>
        <form id="search-form" className="options search-form">
          <input
            autoComplete="off"
            placeholder="支持案由、法院、部门、法官检索"
            id="keyword"
            className="keyword"
            name="keyword"
            type="text"
            value={this.state.keywords}
            onFocus={this.focus.bind(this)}
            onBlur={this.blur.bind(this)}
            onKeyUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let keyCode;
              if (window.event) {
                keyCode = e.keyCode;
              } else if (e.which) {
                keyCode = e.which;
              }
              if (keyCode === 13) {
                this.keyDown();
              }
            }}
            onChange={(e) => {
              e.stopPropagation();
              const keywords = e.target.value;
              this.setState({
                keywords
              }, () => {
                this.watchKeywords(keywords);
              });
            }}
          />
          <div id="submit">
            <img
              alt=""
              id="search-btn"
              src={require('../../assets/home/search/icon_search.png')}
              onClick={this.search.bind(this)}
            />
          </div>
          <div id="my-search">
            {this.$store.state.homeDisplay
              ? <ul className="suggest-list" id="suggest-list" >
                {Object.entries(sources).map((source, index) => (
                  <li key={index} className="suggest-group">
                    <div className="group-name">{source[0]}</div>
                    <ul>
                      {source[1].map((item, index2) => (
                        <li key={index2} className="suggest_item" >
                          <div
                            className="item"
                            onClick={this.itemSelected.bind(this, source[0], item)}
                          >{item.name}</div>
                        </li>))}
                    </ul>
                  </li>))}
              </ul> : null
            }
          </div>
          <input style={{ display: 'none' }} />
        </form>
      </div>
    );
  }
}
export default Search;
