/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import Component from '../../constants/Component';
import Header from '../../commons/Header';
import '../../less/search/searchheader.less';

class SearchHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: -1,
      keywords: '',
      conditions: [], // conditions数组用于弹出框内展示的数据
      sources: []
    };
    this.keyword = [];
  }
  // 搜索框获取焦点
  componentWillUnmount() {
    this.$store.state.searchForm.keywords = [];
  }
  focus() {
    const keywords = this.state.keywords;
    this.$store.state.searchDisplay = keywords !== '';
  }
  blur() {
    const count = -1;
    this.setState({
      count
    });
  }
  // 添加form数据
  itemSelected = (key, item) => {
    const keywords = '';
    const conditions = this.state.conditions;
    if (conditions.indexOf(item) === -1) {
      conditions.push(item);
      this.$store.state.searchDisplay = false;
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
    this.props.emitter.emit('refresh');
  };
  // 监听搜索框变化
  watch = (keywords) => {
    if (keywords !== '') {
      this.$store.state.searchDisplay = true;
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
      this.$store.state.searchDisplay = false;
    }
  };
  // 按下回车操作
  keyDown = () => {
    let keywords = this.state.keywords;
    let count = this.state.count;
    const conditions = this.state.conditions;
    if (keywords.trim().length > 0) {
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
    } else if (count !== -1) {
      const key = conditions[count].typeName;
      const item = conditions[count];
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
      count = -1;
      this.$store.state.searchDisplay = false;
      keywords = '';
      this.setState({
        keywords,
        count,
        conditions
      });
    } else if (keywords.trim().length === 0) {
      HashLocation.push('/judge_search');
    }
    this.props.emitter.emit('refresh');
  };
  render() {
    const { sources } = this.state;
    return (
      <Header >
        <span>
          <div className="search-small">
            <form id="search-form" className="options search-form" >
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
                    this.watch(keywords);
                  });
                }}
              />
              <div id="submit">
                <img
                  alt=""
                  id="search-btn"
                  src={require('../../assets/search/icon_search.png')}
                  onClick={this.keyDown.bind(this)}
                />
              </div>
              <div className="my-search" id="my-search">
                {this.$store.state.searchDisplay
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
        </span>
      </Header>
    );
  }
}
// SearchHeader.propTypes = {
//   emitter: React.PropTypes.any.isRequired
// };
export default SearchHeader;

