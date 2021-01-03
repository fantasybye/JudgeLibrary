/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import Component from '../../constants/Component';
import '../../less/compare/table.less';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      groupClicked: false,
      trialClicked: false,
      docTypeClicked: false,
      helpClicked: false,
      programClicked: false
    };
  }
  toggleGroupClicked = () => {
    this.setState({
      groupClicked: !this.state.groupClicked
    });
  };
  toggleTrialClicked = () => {
    this.setState({
      trialClicked: !this.state.trialClicked
    });
  };
  toggleDocTypeClicked = () => {
    this.setState({
      docTypeClicked: !this.state.docTypeClicked
    });
  };
  toggleHelpClicked = () => {
    this.setState({
      helpClicked: !this.state.helpClicked
    });
  };
  toggleProgramClicked = () => {
    this.setState({
      programClicked: !this.state.programClicked
    });
  };
  render() {
    const { compareLoading, judges } = this.props;
    const { groupClicked, trialClicked, docTypeClicked, helpClicked, programClicked } = this.state;
    return (<div>
      {compareLoading || judges.length === 0 ?
        <div className="compare_loading">
          <Spin size="large" />
        </div> :
        <div className="compare_div clearfix" style={{ width: `${judges.length * 230 + 240}px` }} >
          <div className="table_wrapper">
            <div className="info">
              {judges.map((judge, index) => {
                const list = [];
                list.push(
                  <table key={index} className="data">
                    <tbody>
                      <tr><td>
                        {!judge.judge.sex || judge.judge.sex === 1 ? <span>
                          <img alt="" className="portrait" src={require('../../assets/sex/man.png')} />
                        </span> : <span>
                          <img alt="" className="portrait" src={require('../../assets/sex/woman.png')} />
                        </span>}
                      </td></tr>
                      <tr><td className="name">{judge.judge.name}</td></tr>
                      <tr><td>
                        {(() => {
                          const imgs = [];
                          for (let i = 0; i < judge.judge.starGrade; i += 1) {
                            imgs.push(<img key={i} alt="" src={require('../../assets/judge/judge_icon_star_choose.png')} />);
                          }
                          return imgs;
                        })()}
                        {(() => {
                          const imgs = [];
                          for (let i = 0; i < (5 - judge.judge.starGrade) || 0; i += 1) {
                            imgs.push(<img key={i} alt="" src={require('../../assets/judge/judge_icon_star_normal.png')} />);
                          }
                          return imgs;
                        })()}
                      </td></tr>
                      <tr><td className="part">{judge.judge.courtName}</td></tr>
                      <tr><td className="part">{judge.judge.department}</td></tr>
                    </tbody>
                  </table>
                );
                return list;
              })}
            </div>
            <div className="data">
              <table className="title">
                <tbody>
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_workload.png')} />
                    法官工作量</td></tr>
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_avg_complexity.png')} />
                    平均案件权重</td></tr>
                  <tr><td onClick={this.toggleGroupClicked.bind(this)} className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/compare/trial_group.png')} />
                    审判组织
                    <img
                      alt=""
                      className="arrow"
                      src={!groupClicked ? require('../../assets/compare/table_arrow_up.png')
                        : require('../../assets/compare/table_arrow_down.png')}
                    />
                  </td></tr>
                  {!groupClicked ? null : <tr><td>独任制(次数)</td></tr>}
                  {!groupClicked ? null : <tr><td>合议庭(次数)</td></tr>}
                  <tr><td onClick={this.toggleTrialClicked.bind(this)} className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_amount.png')} />
                    办案数量(件)
                    <img
                      alt=""
                      className="arrow"
                      src={!trialClicked ? require('../../assets/compare/table_arrow_up.png')
                        : require('../../assets/compare/table_arrow_down.png')}
                    />
                  </td></tr>
                  {!trialClicked ? null : <tr><td>一审</td></tr>}
                  {!trialClicked ? null : <tr><td>二审</td></tr>}
                  {!trialClicked ? null : <tr><td>再审</td></tr>}
                  <tr><td onClick={this.toggleProgramClicked.bind(this)} className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/compare/program.png')} />
                    适用程序
                    <img
                      alt=""
                      className="arrow"
                      src={!programClicked ? require('../../assets/compare/table_arrow_up.png')
                        : require('../../assets/compare/table_arrow_down.png')}
                    />
                  </td></tr>
                  {!programClicked ? null : <tr><td>普通程序(次数)</td></tr>}
                  {!programClicked ? null : <tr><td>简易程序(次数)</td></tr>}
                  {!programClicked ? null : <tr><td>速裁程序(次数)</td></tr>}
                  {!programClicked ? null : <tr><td>其他(次数)</td></tr>}
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/compare/session.png')} />
                    开庭次数
                  </td></tr>
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/compare/collegial_panel.png')} />
                    合议庭讨论次数
                  </td></tr>
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_time.png')} />
                    说理长度(字)
                  </td></tr>
                  <tr><td onClick={this.toggleDocTypeClicked.bind(this)} className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_article_amount.png')} />
                    文书类型
                    <img
                      alt=""
                      className="arrow"
                      src={!docTypeClicked ? require('../../assets/compare/table_arrow_up.png')
                        : require('../../assets/compare/table_arrow_down.png')}
                    />
                  </td></tr>
                  {!docTypeClicked ? null : <tr><td>判决书</td></tr>}
                  {!docTypeClicked ? null : <tr><td>裁定书</td></tr>}
                  {!docTypeClicked ? null : <tr><td>决定书</td></tr>}
                  {!docTypeClicked ? null : <tr><td>通知书</td></tr>}
                  {!docTypeClicked ? null : <tr><td>调解书</td></tr>}
                  {!docTypeClicked ? null : <tr><td>其他</td></tr>}
                  <tr><td className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/judge/judge_icon_number.png')} />
                    文书字数(万字)
                  </td></tr>
                  <tr><td onClick={this.toggleHelpClicked.bind(this)} className="total_item">
                    <img className="front_img" alt="" src={require('../../assets/compare/help.png')} />
                    审判辅助工作
                    <img
                      alt=""
                      className="arrow"
                      src={!helpClicked ? require('../../assets/compare/table_arrow_up.png')
                        : require('../../assets/compare/table_arrow_down.png')}
                    />
                  </td></tr>
                  {!helpClicked ? null : <tr><td>调查、听证、提审、调解次数</td></tr>}
                  {!helpClicked ? null : <tr><td>接待当事人来访次数</td></tr>}
                  {!helpClicked ? null : <tr><td>鉴定次数</td></tr>}
                </tbody>
              </table>
              {judges.map((judge, index) => {
                const list = [];
                list.push(
                  <table key={index} className="judge">
                    <tbody>
                      <tr><td data="judge.workload">{judge.workload ? judge.workload.toFixed(2) : 0}</td></tr>
                      <tr><td data="judge.avgComplexity" >
                        {judge.avgComplexity ? judge.avgComplexity.toFixed(3) : 0}
                      </td></tr>
                      <tr><td data="judge.trialGroup">{judge.trialGroup}</td></tr>
                      {!groupClicked ? null : <tr><td data="judge.trialGroup0">{judge.trialGroup0}</td></tr>}
                      {!groupClicked ? null : <tr><td data="judge.trialGroup1">{judge.trialGroup1}</td></tr>}
                      <tr><td data="judge.trialCount">{judge.trialCount}</td></tr>
                      {!trialClicked ? null : <tr><td data="judge.trial1">{judge.trial1}</td></tr>}
                      {!trialClicked ? null : <tr><td data="judge.trial2">{judge.trial2}</td></tr>}
                      {!trialClicked ? null : <tr><td data="judge.trial3">{judge.trial3}</td></tr>}
                      <tr><td data="judge.reasonLength">
                        {!judge.applicableProcedure ? 0 : judge.applicableProcedure.programCount}</td></tr>
                      {!programClicked ? null : <tr><td data="judge.reasonLength">
                        {!judge.applicableProcedure ? 0 : judge.applicableProcedure.normalCount}</td></tr>}
                      {!programClicked ? null : <tr><td data="judge.reasonLength">
                        {!judge.applicableProcedure ? 0 : judge.applicableProcedure.simpleCount}</td></tr>}
                      {!programClicked ? null : <tr><td data="judge.reasonLength">
                        {!judge.applicableProcedure ? 0 : judge.applicableProcedure.quickCount}</td></tr>}
                      {!programClicked ? null : <tr><td data="judge.reasonLength">
                        {!judge.applicableProcedure ? 0 : judge.applicableProcedure.othersCount}</td></tr>}
                      <tr><td data="judge.reasonLength">{judge.sessionCount}</td></tr>
                      <tr><td data="judge.reasonLength">{judge.discussionCount}</td></tr>
                      <tr><td data="judge.reasonLength">{judge.reasonLength}</td></tr>
                      <tr><td data="judge.docCount">{judge.docCount}</td></tr>
                      {!docTypeClicked ? null : <tr><td data="judge.docType1">{judge.docType1}</td></tr>}
                      {!docTypeClicked ? null : <tr><td data="judge.docType2">{judge.docType2}</td></tr>}
                      {!docTypeClicked ? null : <tr><td data="judge.docType3">{judge.docType3}</td></tr>}
                      {!docTypeClicked ? null : <tr><td data="judge.docType4">{judge.docType4}</td></tr>}
                      {!docTypeClicked ? null : <tr><td data="judge.docType5">{judge.docType5}</td></tr>}
                      {!docTypeClicked ? null : <tr><td data="judge.docType0">{judge.docType0}</td></tr>}
                      <tr><td data="judge.docLength">{judge.docLength.toFixed(2)}</td></tr>
                      <tr><td>{!judge.help ? 0 : judge.help.helpCount}</td></tr>
                      {!helpClicked ? null : <tr><td>{!judge.help ? 0 : judge.help.investigaitionCount}</td></tr>}
                      {!helpClicked ? null : <tr><td>{!judge.help ? 0 : judge.help.receptionCount}</td></tr>}
                      {!helpClicked ? null : <tr><td>{!judge.help ? 0 : judge.help.appraisalCount}</td></tr>}
                    </tbody>
                  </table>
                );
                return list;
              })}
            </div >
          </div>
        </div>}
    </div>);
  }
}
// Table.propTypes = {
//   compareLoading: React.PropTypes.bool.isRequired,
//   judges: React.PropTypes.array.isRequired
// };
export default Table;
