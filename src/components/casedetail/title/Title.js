/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import moment from 'moment';
import Component from '../../../constants/Component';
import '../../../less/casedetail/title/title.less';

class Title extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { caseInfo } = this.props;
    return (<div className="case_detail_title">
      <div className="title_name">{caseInfo.name}</div>
      <div className="title_detail">
        <span className="title_span">判决时间：</span>
        <span className="val">{moment(caseInfo.decideTime).format('YYYY-MM-DD')}</span>
        <span className="title_span">法院：</span>
        <span className="val">{caseInfo.courtName}</span>
        <span className="title_span">审理程序：</span>
        <span className="val">{caseInfo.gradeName}</span>
        <span className="title_span">案由：</span>
        <span className="val">{caseInfo.caseCauseName}</span>
        <span className="title_span">案号：</span>
        <span className="val">{caseInfo.caseNumber}</span>
      </div>
    </div>);
  }
}
// Title.propTypes = {
//   caseInfo: React.PropTypes.object.isRequired
// };
export default Title;
