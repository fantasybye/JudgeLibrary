/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import '../../less/judgedetail/title.less';

class Title extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  toStarComment = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/judge_comment?judgeId=${id}`);
  };

  render() {
    const { judge } = this.props;
    return (<div className="detail_info">
      {judge ? <div>
        <div className="portrait">
          {judge.sex === 2 ? <img alt="" src={require('../../assets/sex/woman.png')} />
            : <img alt="" src={require('../../assets/sex/man.png')} />}
        </div>
        <div className="infos">
          <div className="base_info">
            <a className="name" onClick={this.toStarComment.bind(this, judge.id)} target="_blank">{judge.name}</a>
            {/* <span className="sex" >{(!judge.sex) ? '-' : judge.sex === 1 ? '男' : '女'}</span>*/}
          </div>
          <div className="more_info">
            <div className="star_question">
              <div className="star">
                {(() => {
                  const imgs = [];
                  for (let i = 0; i < judge.starGrade; i += 1) {
                    imgs.push(<img key={i} alt="" src={require('../../assets/judge/star_yellow.png')} />);
                  }
                  return imgs;
                })()}
                {(() => {
                  const imgs = [];
                  for (let i = 0; i < (5 - judge.starGrade) || 0; i += 1) {
                    imgs.push(<img key={i} alt="" src={require('../../assets/judge/star_gray.png')} />);
                  }
                  return imgs;
                })()}
              </div>
              <img alt="" className="question" src={require('../../assets/judgedetail/title/star_question.png')} />
              <div className="show_star_question">
                <div className="question_description"><span>法官星级评价是由“案由”,“案由系数”,“案件权重”,“案件数量”这些指标综合计算得出</span></div>
                <div id="open_star_detail"><a onClick={this.toStarComment.bind(this, judge.id)} target="_blank">查看详情</a></div>
              </div>
            </div>
            <div className="workload" onClick={this.toStarComment.bind(this, judge.id)}>
              <span className="divide">|</span><span>法官工作量：</span><span className="num">{judge.workload ? judge.workload.toFixed(2) : 0}</span>
            </div>
          </div>
          <div className="location">
            <img alt="" src={require('../../assets/judgedetail/title/icon_court.png')} />
            <span className="courtName">{judge.courtName}</span>
            <span className="divide">|</span>
            <img alt="" src={require('../../assets/judgedetail/title/icon_department.png')} />
            <span className="department">{judge.department}</span>
          </div>
        </div>
      </div> : null}
      <img alt="" src={require('../../assets/judgedetail/title/line_thick.png')} />
    </div>);
  }
}
// Title.propTypes = {
//   judge: React.PropTypes.object.isRequired
// };
export default Title;
