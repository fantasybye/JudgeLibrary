/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import moment from 'moment';
import EChart from 'echarts-for-react';
import Component from '../../constants/Component';
import '../../less/judgedetail/analysis.less';

class Analysis extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      horizonChosen: 0,
      verticalChosen: 0,
      verticalChosen2: 0,
      proceedingChecked: 0,
      docTypeChecked: 0,
      docTypeHiddenId: '100', // 右边两个内联导航的key
      proceedingTypeHiddenId: '100',
      proceedingTypes: [
        { id: '100', name: '历年趋势' },
        { id: '200', name: '案件对比' },
        { id: 'proceedingCount1', name: '一审' },
        { id: 'proceedingCount2', name: '二审' },
        { id: 'proceedingCount3', name: '再审' },
        { id: 'proceedingCount0', name: '其他' }
      ],
      docTypes: [
        { id: '100', name: '文书对比' },
        { id: 'docTypeCount1', name: '判决书' },
        { id: 'docTypeCount2', name: '裁定书' },
        { id: 'docTypeCount3', name: '决定书' },
        { id: 'docTypeCount4', name: '通知书' },
        { id: 'docTypeCount5', name: '调解书' },
        { id: 'docTypeCount0', name: '其他' }
      ],
      verticals: [
        { className: 'case_amount', name: '办案数量' },
        { className: 'case_time', name: '说理长度' },
        { className: 'doc_amount', name: '文书数量' },
        { className: 'doc_word_count', name: '文书字数' }
      ],
      verticals2: [
        { className: 'whole_complex', name: '案件权重' },
        { className: 'dispute_focus', name: '争议焦点' },
        { className: 'demurrer_strength', name: '抗辩强度' },
        { className: 'judicial_proceeding', name: '诉讼程序' }
      ],
      horizons: [
        { className: 'whole', name: '综合数据分析' },
        { className: 'different_status', name: '身份数据分析' },
        { className: 'demurrer_strength', name: '擅长案由分析' },
        { className: 'complex', name: '案件权重分析' }
      ],
      complexShow: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.complexityWhole.caseInfo) {
      this.setState({ complexShow: false });
    } else {
      this.setState({ complexShow: true });
    }
  }
  toCaseDetail = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/case_detail?caseInfoId=${id}`);
  };
  // 平均案件权重的数据
  judgeAvg = () => (Math.round(this.props.complexityWhole.judgeAvg * 10000) / 10000);
  judgeHigher = () => (Math.round((this.props.complexityWhole.judgeAvg
    - this.props.complexityWhole.commonAvg)
    / this.props.complexityWhole.commonAvg * 100) / 100);
  judgeMax = () => (Math.round(this.props.complexityWhole.judgeMax * 10000) / 10000);
  essay = () => {
    const essay = {};
    if (!this.props.complexityWhole.caseInfo) {
      return essay;
    }
    essay.time = `日期：
     ${moment(this.props.complexityWhole.caseInfo.decideTime).format('YYYY年MM月DD日')}  
     ${this.props.complexityWhole.courtName}`;
    const name = this.props.complexityWhole.caseInfo.name;
    essay.essayTitle = name.length > 0 ? `${name.substring(0, 30)}......` : name;
    const desc = this.props.complexityWhole.caseInfo.description;
    essay.description = desc.length > 0 ? `${desc.substring(0, 180)}......` : desc;
    essay.id = this.props.complexityWhole.caseInfo.id;
    return essay;
  };
  // 抗辩强度的数据
  demurrerHigher = () => {
    const result = {};
    const avgPlaintiffDefendantLen = this.props.complexityFocus.avgPlaintiffDefendantLen;
    const plaintiffDefendantLen = this.props.complexityFocus.plaintiffDefendantLen;
    const data = Math.round((plaintiffDefendantLen - avgPlaintiffDefendantLen)
      / avgPlaintiffDefendantLen * 100) / 100 || 0;
    result.dataDisplay = data > 0 ? `${data}` : data === 0 ? '' : `${-data}`;
    result.data = data;
    result.strDisplay = data > 0 ? '高出平均：' : data === 0 ? '持平平均：' : '低于平均：';
    return result;
  };
  // 争议焦点的数据
  avgfocusCountPrivate = () => (Math.round(this.props.complexityFocus.focusCount
    / this.props.complexityFocus.caseTotal * 1000) / 1000 || 0);
  chooseHorizon = (index) => {
    this.props.emitter.emit('chooseHorizon', index);
    this.setState({
      horizonChosen: index
    });
  };
  chooseVertical = (index) => {
    this.setState({
      verticalChosen: index
    });
  };
  chooseVertical2 = (index) => {
    this.setState({
      verticalChosen2: index
    });
  };
  chooseProceedingType = (index) => {
    this.setState({
      proceedingChecked: index,
      proceedingTypeHiddenId: this.state.proceedingTypes[index].id
    });
  };
  chooseDocType = (index) => {
    this.setState({
      docTypeChecked: index,
      docTypeHiddenId: this.state.docTypes[index].id
    });
  };
  percent = (itemCount, caseCauseCount) =>
    (`${Math.round(1000 * (itemCount / caseCauseCount)) / 10}%`);
  render() {
    const { judgeDetail, statusData, docTypeMap, proceedingMap, options,
      complexData, goodAt, complexityFocus } = this.props;
    const { horizonChosen, verticalChosen, verticalChosen2, proceedingChecked, docTypeChecked,
      horizons, verticals, verticals2, docTypes, proceedingTypes, complexShow,
      docTypeHiddenId, proceedingTypeHiddenId } = this.state;
    return (<div className="analysis_div">
      {/* 竖直导航区 1级导航*/}
      <div className="charts_navigate">
        {horizons.map((item, index) => {
          const list = [];
          list.push(<div key={index} onClick={this.chooseHorizon.bind(this, index)}>
            <div
              className={horizonChosen === index
                ? `navi choosed ${item.className}`
                : `navi ${item.className}`}
            >{item.name}</div>
          </div>);
          return list;
        })}
      </div>
      {/* 综合分析*/}
      {horizonChosen === 0 ? <div className="charts navi_whole">
        {/* 水平导航区 2级导航*/}
        {/* 文书数量、文书字数、说理长度、案由列表等信息，请求api为judge/detail*/}
        <div className="chart_navi">
          {verticals.map((item, index) => {
            const list = [];
            list.push(<div key={index} onClick={this.chooseVertical.bind(this, index)} >
              <div className={verticalChosen === index
                ? `vertical_navi choosed ${item.className}`
                : `vertical_navi ${item.className}`}
              >{item.name}</div>
            </div>);
            return list;
          })}
        </div>
        {/* 办案数量*/}
        {verticalChosen === 0 ? <div className="little_chart navi_case_amount">
          <div className="total">
            总数：<span className="case_total">{judgeDetail.caseTotal}</span>件
            <div className="case_status">
              <span>作为审判长：<span className="status_count">{statusData.judgeCount}</span>件</span>
              <span className="middle">作为承办人：<span className="status_count">{statusData.underTakerCount}</span>件</span>
              <span>作为参与合议人：<span className="status_count">{statusData.collegialCount}</span>件</span>
            </div>
          </div>
          {/* 3级导航区*/}
          <div className="chart_navi">
            {proceedingTypes.map((item, index) => {
              const list = [];
              list.push(<span
                key={index}
                className={proceedingChecked === index ? 'choosed' : ''}
                onClick={this.chooseProceedingType.bind(this, index)}
              ><span className="choose_span">【</span>{item.name}<span className="choose_span" >】</span>
              </span>);
              return list;
            }) }
          </div>
          <div className="main_chart">
            {proceedingTypeHiddenId === '100' ? <div id="trend_chart" >
              <EChart option={options.trendOption} style={{ width: '100%', height: '100%' }} />
            </div>
              : null}
            {proceedingTypeHiddenId === '200' ? <div id="case_chart" >
              <EChart option={options.caseOption} style={{ width: '100%', height: '100%' }} />
            </div>
              : null}
            {Object.entries(proceedingMap).map((item, index) => {
              const list = [];
              list.push(<div key={index}>
                {proceedingTypeHiddenId === item[0]
                  ? <div className="navi3 hear"><div>
                    <span className="proceeding_text">{item[1]}</span>件</div></div> : null}
              </div>);
              return list;
            })}
          </div>
        </div> : null}
        {/* 说理长度 本来是办案时长*/}
        {verticalChosen === 1 ? <div className="little_chart navi_case_time">
          <div className="total">
            字数总数：<span className="case_total">
              {judgeDetail.reasonLength > 10000
                ? (`${(judgeDetail.reasonLength / 10000).toFixed(2)}万`)
                : judgeDetail.reasonLength}</span>字
          </div>
          <div className="total">
            {/* 说理长度直方图:*/}
            <div id="reason_chart" >
              <EChart option={options.reasonOption} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div> : null}
        {/* 文书数量*/}
        {verticalChosen === 2 ? <div className="little_chart navi_doc_amount">
          <div className="total">
        总数：<span className="case_total">{judgeDetail.caseTotal}</span>件
          </div>
          {/* 3级导航区文书类型，1位判决书，2位裁定书,3为决定书，4为通知书,5为调解书*/}
          <div className="doc_chart_navi">
            {docTypes.map((item, index) => {
              const list = [];
              list.push(<span
                className={docTypeChecked === index ? 'c-p choosed' : 'c-p'}
                onClick={this.chooseDocType.bind(this, index)}
              ><span className="choose_span">【</span>{item.name}<span className="choose_span">】</span>
              </span>);
              return list;
            })}
          </div>
          <div className="main_chart">
            {docTypeHiddenId === '100' ? <div id="wenshu_chart" >
              <EChart option={options.docCountOption} style={{ width: '100%', height: '100%' }} />
            </div> : null}
            {Object.entries(docTypeMap).map((item, index) => {
              const list = [];
              list.push(<div key={index}>
                {docTypeHiddenId === item[0] ? <div className="navi_doc3 hear">
                  <div><span className="doctype_text">{item[1]}</span>件</div></div> : null}</div>);
              return list;
            })}
          </div>
        </div> : null}
        {/* 文书字数*/}
        {verticalChosen === 3 ? <div className="little_chart navi_doc_word_count">
          <div className="total">
        字数总数：<span className="case_total">{judgeDetail.wordCount}</span>万字
          </div>
          <div className="total">
            {/* 文书字数直方图:*/}
            <div id="doc_chart" >
              <EChart option={options.docOption} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div> : null}
      </div> : null}
      {/* 身份数据分析*/}
      <div
        className="charts navi_different_status"
        style={(horizonChosen !== 1
          || (!statusData.judgeCount
            && !statusData.underTakerCount
            && !statusData.collegialCount)) ? { display: 'none' } : {}}
        id="different_status"
      ><EChart option={options.statusOption} style={{ width: '560px', height: '380px' }} /></div>
      {(horizonChosen === 1
        && !statusData.judgeCount
          && !statusData.underTakerCount
          && !statusData.collegialCount)
        ? <img
          alt=""
          style={{ margin: '100px' }}
          src={require('../../assets/judgedetail/analysis/no_data.png')}
        /> : null }
      {/* 擅长案由分析*/}
      {horizonChosen === 2 ? <div className="charts navi_good_at">
        <div className="good_at">
          <div className="case_cause">{goodAt.caseCauseName || '没有擅长案由！或者案由没有区分。'}</div>
          {goodAt.caseCauseName ? <div className="good_at_total" id="good_at_total">
            <span className="case_total">{goodAt.caseCauseCount}</span>件</div> : null}
        </div>
        {goodAt.caseCauseName ? <table className="good_ats">
          <tbody>
            {!goodAt.tags || goodAt.tags.length === 0
              ? <tr className="case_cause"><td>
              该法官该案由的文书，未打标签！</td></tr>
              : goodAt.tags.map((item, index) => {
                const list = [];
                list.push(<tr key={index}>
                  <td><span>{item.name || ''}</span></td>
                  <td><span className="list_text">{item.count || 0}</span> 件</td>
                  <td>|</td>
                  <td><span className="list_text">{this.percent(item.count, goodAt.caseCauseCount)}</span></td>
                </tr>);
                return list;
              }) }
          </tbody>
        </table> : null}
      </div> : null}
      {/* 案件权重分析*/}
      {horizonChosen === 3 ? <div className="charts navi_complex">
        {/* 水平导航区 2级导航*/}
        <div className="chart_navi">
          {verticals2.map((item, index) => {
            const list = [];
            list.push(<div key={index} onClick={this.chooseVertical2.bind(this, index)}>
              <div className={verticalChosen2 === index
                ? `vertical_complex_navi ${item.className} chosen`
                : `vertical_complex_navi ${item.className} normal`}
              >{item.name}</div>
            </div>);
            return list;
          })}
        </div>
        {/* 平均案件权重*/}
        {verticalChosen2 === 0 ? <div className="little_chart_complex navi_whole_complex">
          {!complexShow ? <img
            alt=""
            style={{ margin: '100px' }}
            src={require('../../assets/judgedetail/analysis/no_data.png')}
          /> : <div>
            <div className="total">
              平均案件权重：<span className="avg_num_span" >{this.judgeAvg()}</span>
              <span>{this.judgeHigher() > 0 ? '高出平均：'
                : this.judgeHigher() === 0 ? '持平平均：' : '低于平均：'}
              </span>
              {this.judgeHigher() > 0
                ? <img alt="" src={require('../../assets/judgedetail/analysis/icon_growup.png')} />
                : <img alt="" src={require('../../assets/judgedetail/analysis/icon_growdown.png')} />}
              {this.judgeHigher() >= 0
                ? <span>
                  <span className="avg_num_span">{this.judgeHigher()}</span>
                  <span style={{ marginLeft: '-20px' }}>倍</span>
                </span>
                : <span className="down">
                  <span className="avg_num_span">{ 0 - this.judgeHigher()}</span>
                  <span style={{ marginLeft: '-20px' }}>倍</span>
                </span> }
            </div>
            <div className="max"><span style={{ color: '#7DB362' }}>【</span>
              最高权重 <span className="num">{this.judgeMax()}</span>
              <span style={{ color: '#7DB362' }}>】</span></div>
            <div className="essay">
              <div className="case_weight_essay_title">
                <a onClick={this.toCaseDetail.bind(this, this.essay().id)} target="_blank">
                  {this.essay().essayTitle}
                </a>
              </div>
              <div className="description">{this.essay().description}</div>
              <div className="case_weight_essay_time">{this.essay().time}</div>
            </div>
          </div> }
        </div> : null}
        {/* 争议焦点总数*/}
        {verticalChosen2 === 1 ? <div className="little_chart_complex navi_dispute_focus">
          <div className="total">
        争议焦点总数：<span className="focus_num_span">{complexityFocus.focusCount}</span>
          </div>
          <div className="avg_title">
            <span style={{ color: '#7DB362' }}>
              【</span>每个案件平均争议焦点数<span style={{ color: '#7DB362' }}>】
            </span>
          </div>
          <div className="avg"><div><span className="focus_num_span">{this.avgfocusCountPrivate()}</span>个</div></div>
        </div> : null}
        {/* 抗辩强度*/}
        {verticalChosen2 === 2 ? <div className="little_chart_complex navi_demurrer_strength">
          <div className="demurrer_strength_title">抗辩强度：<div className="question_img" />
            <div className="show_explanation">
              <div className="strength_description">
                指在诉讼过程中，被告对于原告提出的诉讼请求或是检察院的指控予以否定而提出的意见。
                抗辩强度的大小根据<label>被告辩称的长短、个数、类型</label>计算，
                同时<label>原告诉称</label>或是<label>检察院指控的长短</label>对强度的计算也有影响。
              </div>
            </div>
          </div>
          <div className="data"><span>{complexityFocus.plaintiffDefendantLen}</span></div>
          <div className="compare">
            {this.demurrerHigher().strDisplay}
            {this.demurrerHigher().data > 0
              ? <img alt="" src={require('../../assets/judgedetail/analysis/icon_growup.png')} />
              : this.demurrerHigher().data === 0
                ? <img alt="" src={require('../../assets/judgedetail/analysis/icon_line.png')} />
                : <img alt="" src={require('../../assets/judgedetail/analysis/icon_growdown.png')} /> }
            <span className={this.demurrerHigher().data < 0 ? 'compare_num_span down' : 'compare_num_span'}>
              {this.demurrerHigher().dataDisplay}
            </span><span>倍</span>
          </div>
        </div> : null}
        {/* 诉讼程序*/}
        {verticalChosen2 === 3 ? <div
          className="little_chart_complex navi_judicial_proceeding"
          id="judicial_proceeding"
        > {complexData.simpleCount === 0 && complexData.commonCount === 0
            ? <img
              alt=""
              style={{ margin: '100px' }}
              src={require('../../assets/judgedetail/analysis/no_data.png')}
            /> : <EChart option={options.proceedingOption} style={{ width: '530px', height: '330px' }} />}
        </div> : null}
      </div> : null}
      {/* 筛选情况 */}
      {judgeDetail.form ? <div className="warning">
        <span style={{ fontSize: '24px', color: '#f91516' }}>*</span>
        注释：以上数据为
        <span className="option">{judgeDetail.form.caseCauseName}</span>
        <span className="option">{this.$store.state.displayTime}</span>
        <span className="option">{judgeDetail.form.proceedingName}</span>
        <span className="option">{judgeDetail.form.docTypeName}</span>
        下的数据
      </div> : null}
    </div>);
  }
}
// Analysis.propTypes = {
//   judgeDetail: React.PropTypes.object.isRequired,
//   emitter: React.PropTypes.any.isRequired,
//   statusData: React.PropTypes.object.isRequired,
//   proceedingMap: React.PropTypes.object.isRequired,
//   docTypeMap: React.PropTypes.object.isRequired,
//   goodAt: React.PropTypes.object.isRequired,
//   complexityWhole: React.PropTypes.object.isRequired,
//   complexityFocus: React.PropTypes.object.isRequired,
//   complexData: React.PropTypes.object.isRequired,
//   options: React.PropTypes.object.isRequired
// };
export default Analysis;
