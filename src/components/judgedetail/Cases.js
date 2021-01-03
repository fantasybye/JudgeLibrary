/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import moment from 'moment';
import Component from '../../constants/Component';
import Pagination from '../../commons/Pagination';
import '../../less/judgedetail/cases.less';

const EventEmitter = require('events').EventEmitter;

class Cases extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showHiddenCase: false,
      caseCauseSelected: 0,
      pager: {
        currentpage: 1,
        pagecount: 0,
        count: 0,
        limit: 0
      },
      order: false // false 为降序，true 为升序
    };
    this.emitter = new EventEmitter();
  }
  componentDidMount() {
    this.emitter.on('changePage', this.callback.bind(this));
    this.pagerInit(this.props);
  }
  pagerInit = (props) => {
    this.setState({
      emitter: props.emitter,
      pager: props.relativeCases.pager
    });
  };
  toggleOrder = () => {
    const emitter = this.props.emitter;
    emitter.emit('loading');
    Object.assign(this.$store.state.judgeForm, { order: !this.state.order });
    this.$api.detail.showExample.request(this.$store.state.judgeForm).then(({ data }) => {
      emitter.emit('changePage', data.data);
    });
    this.setState({
      order: !this.state.order
    });
  };
  toCaseDetail = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/case_detail?caseInfoId=${id}`);
  };
  toCaseWeight = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/case_weight?caseInfoId=${id}`);
  };
  hideCases = () => {
    this.setState({
      showHiddenCase: !this.state.showHiddenCase
    });
  };
  selectCaseCauses = (id) => {
    const emitter = this.props.emitter;
    let index = 0;
    if (id !== 0) {
      this.$store.state.judgeForm.caseCauseId = id;
      index = this.props.caseCauses.findIndex(row => row.id === id) + 1;
    } else {
      this.$store.state.judgeForm.caseCauseId = '';
    }
    emitter.emit('loading');
    this.setState({
      caseCauseSelected: index
    });
    this.$api.detail.showExample.request(this.$store.state.judgeForm).then(({ data }) => {
      emitter.emit('changePage', data.data);
    });
  };
  // 分页请求
  callback = (page) => {
    const emitter = this.state.emitter;
    const pager = this.state.pager;
    Object.assign(pager, { currentpage: page });
    Object.assign(this.$store.state.judgeForm, pager);
    emitter.emit('loading');
    this.$api.detail.showExample.request(this.$store.state.judgeForm).then(({ data }) => {
      emitter.emit('changePage', data.data);
      this.setState({
        pager
      });
    });
  };
  render() {
    const { caseCauses, caseCausesNum, detailLoading, relativeCases } = this.props;
    const { caseCauseSelected, showHiddenCase, order } = this.state;
    return (<div className="related_case" id="related_case">
      <div className="related_case_title">
        <div>
          <img alt="" src={require('../../assets/judgedetail/cases/icon_article.png')} />
          <span>相关案例</span>
        </div>
        <img alt="" src={require('../../assets/judgedetail/line_thin.png')} />
      </div>
      <div className="caseCause clearfix">
        {(() => {
          const list = [];
          list.push(<div key={0}>
            <div
              className={caseCauseSelected === 0 ? 'cause selected' : 'cause'}
              onClick={this.selectCaseCauses.bind(this, 0)}
            >全部案由({caseCausesNum[0]}起)
            </div>
            { caseCauseSelected === 0 ? <div className="order_selection">
              <img
                onClick={this.toggleOrder.bind(this)}
                alt=""
                src={order
                  ? require('../../assets/judgedetail/cases/order_up.png')
                  : require('../../assets/judgedetail/cases/order_down.png')}
              /></div> : null}</div>);
          caseCauses.forEach((item, index) => {
            list.push(<div key={index + 1}>
              <div
                className={caseCauseSelected === index + 1 ? 'cause selected' : 'cause'}
                onClick={this.selectCaseCauses.bind(this, item.id)}
              >{item.name === '民事案' ? '其他民事纠纷' : item.name}({caseCausesNum[index + 1]}起)
              </div>
              { caseCauseSelected === index + 1 ? <div className="order_selection">
                <img
                  onClick={this.toggleOrder.bind(this)}
                  alt=""
                  src={order
                    ? require('../../assets/judgedetail/cases/order_up.png')
                    : require('../../assets/judgedetail/cases/order_down.png')}
                /></div> : null}
            </div>);
          });
          return list;
        })()}
      </div>
      <ul className="cases">
        {detailLoading ? <li className="case">
          <div className="loading">
            <Spin size="large" />
          </div></li>
          : !relativeCases.caseInfos ? <li className="case">
            <div className="no_case">该筛选条件下没有文书！</div>
          </li> : relativeCases.caseInfos.map((item, index) => {
            const list = [];
            list.push(index === 0 || index === 1 || showHiddenCase
              ? <li key={index} className="case">
                <div className="title_div">
                  <div className="case_title c-p">
                    <a className="title_a" onClick={this.toCaseWeight.bind(this, item.id)} target="_blank">{item.name}</a>
                    <a className="detail_a" onClick={this.toCaseDetail.bind(this, item.id)} target="_blank">查看文书详情 ＞</a>
                  </div>
                  <div className="case_question">
                    案件权重：<a className="weight_span" onClick={this.toCaseWeight.bind(this, item.id)} target="_blank">{item.caseComplexity === 0 ? '? ? ?' : item.caseComplexity.toFixed(3)}</a>
                    <div className="question_img" />
                    <div className="show_case_question">
                      <div className="question_description">
                        案件权重介于 <label>0 ~ 1</label> 之间；是对 案件复杂情况综合计算得出的指标，
                        用于反映真实的案件复杂情况
                      </div>
                      <div className="open_case_question">
                        <a onClick={this.toCaseWeight.bind(this, item.id)} target="_blank">查看详情</a>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="result">
                  {item.description.length > 200
                    ? `${item.description.substring(0, 200)}......` : item.description}
                </p>
                <div className="court_div">
                  {/* 法庭名称*/}
                  {item.court.name ? <div className="court">{item.court.name}</div> : null}
                  <div className="judge_time">{moment(item.decideTime).format('YYYY-MM-DD')}</div>
                </div>
              </li> : null);
            return list;
          }) }
      </ul>
      {showHiddenCase && relativeCases.pager.count ? <div className="pager_div">
        <div className="center" style={{ marginLeft: '250px' }}>
          <Pagination
            current={relativeCases.pager.currentpage}
            allPage={relativeCases.pager.pagecount}
            allCount={relativeCases.pager.count}
            emitter={this.emitter}
          />
        </div>
      </div> : null }
      {!showHiddenCase && relativeCases.caseInfos ? <div className="show_more" onClick={this.hideCases.bind(this)}>
        <span className="cursor_pointer">查看更多案例</span>
      </div> : <div className="show_more" onClick={this.hideCases.bind(this)}>
        <span className="cursor_pointer">收起更多案例</span>
      </div>}
    </div>);
  }
}
// Cases.propTypes = {
//   caseCauses: React.PropTypes.array.isRequired,
//   caseCausesNum: React.PropTypes.array.isRequired,
//   detailLoading: React.PropTypes.bool.isRequired,
//   relativeCases: React.PropTypes.object.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Cases;
