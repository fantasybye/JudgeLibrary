/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../../constants/Component';
import '../../../less/casedetail/content/info.less';

class Info extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { caseInfo } = this.props;
    return (<div className="info_div">
      <div className="base_info_title clearfix">
        <img alt="" src={require('../../../assets/casedetail/icon_info.png')} />
        <div>基本信息</div>
      </div>
      <div className="base_info">
        <div className="litigant_title">当事人信息</div>
        <div className="party_info">
          {caseInfo.parties.map((item, index) => {
            const list = [];
            list.push(<div>
              <div key={index} className="name">
                <span>{item.legalStatus === 1 ? '原告:' : '被告:'}</span> {item.name}
              </div>
              {item.sex ? <div className="sex">
                性别：
                <span>{item.sex === 1 ? '男' : '女'}</span>
              </div> : null}
            </div>);
            return list;
          })}
        </div>
      </div>
      <div className="tags">
        {caseInfo.sentenceTags.map((tag, index) => {
          const tags = [];
          tags.push(<div key={index} className="tag">
            <a>
              <div className="img" />
              <div className="tag_name">{tag.tagName}</div>
            </a>
          </div>);
          return tags;
        })}
      </div>
    </div>);
  }
}
// Info.propTypes = {
//   caseInfo: React.PropTypes.object.isRequired
// };
export default Info;
