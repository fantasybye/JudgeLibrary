/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import '../../less/search/judgelistitem.less';

class JudgeListItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  toDetail = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/judge_detail?judgeId=${id}`);
  };

  render() {
    const { judge, emitter } = this.props;
    return (<li className="judgelistitem">
      <div className="info" title="点击查看该法官详细信息">
        <a onClick={this.toDetail.bind(this, judge.judge.id)} target="_blank">
          <div className="portrait">
            {judge.judge.sex === 2 ? <img alt="" src={require('../../assets/sex/woman.png')} />
              : <img alt="" src={require('../../assets/sex/man.png')} />}
          </div>
          <div className="infos">
            <div className="base_info">
              <div className="name" title={judge.judge.name}>{judge.judge.name.substring(0, 5)}</div>
              <div className="sex" >{(!judge.judge.sex) ? '-' : judge.judge.sex === 2 ? '女' : '男'}</div>
              <div className="year" >{`${judge.judge.age || '-'}岁`}</div>
            </div>
            <div className="courtName" >{judge.judge.courtName}</div>
            <div className="department" >{judge.judge.department ? judge.judge.department.substring(0, 10) : ''}</div>
            <div className="star">
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
            </div>
          </div>
        </a>
      </div>
      <div className="aggregation_info">
        <table className="">
          <tbody>
            <tr>
              <td><img alt="" src={require('../../assets/judge/judge_icon_workload.png')} />法官工作量</td>
              <td>|</td>
              <td>{judge.judge.workload ? judge.judge.workload.toFixed(2) : 0}</td>
            </tr>
            <tr>
              <td><img alt="" src={require('../../assets/judge/judge_icon_avg_complexity.png')} />平均案件权重</td>
              <td>|</td>
              <td>{judge.avgComplexity ? judge.avgComplexity.toFixed(2) : 0}</td>
            </tr>
            <tr>
              <td><img alt="" src={require('../../assets/judge/judge_icon_amount.png')} />办案数量</td>
              <td>|</td>
              <td>{judge.docCount}件</td>
            </tr>
            <tr>
              <td><img alt="" src={require('../../assets/judge/judge_icon_time.png')} />说理长度</td>
              <td>|</td>
              <td>{(() => {
                let str = judge.reasonLength || 0;
                if (judge.reasonLength > 10000) {
                  str = `${(judge.reasonLength / 10000).toFixed(2)}万`;
                }
                return `${str}字`;
              })()}</td>
            </tr>
            <tr />
          </tbody>
        </table>
        <div
          className="add_to_compare c-p"
          onClick={() => {
            emitter.emit('addCompare', judge.judge.id, judge.judge.name);
          }}
        >+ 对比</div>
      </div>
    </li>);
  }
}
// JudgeListItem.propTypes = {
//   emitter: React.PropTypes.any.isRequired,
//   judge: React.PropTypes.object.isRequired
// };
export default JudgeListItem;
