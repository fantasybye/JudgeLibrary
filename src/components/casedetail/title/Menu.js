/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../../constants/Component';
import '../../../less/casedetail/title/menu.less';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { paraMap, paraTagMap, emitter } = this.props;
    return (<div className="navigate_div">
      <div className="navigate">
        <img alt="" src={require('../../../assets/casedetail/icon_content.png')} />
        <span>目录</span><span>|</span>
      </div>
      <div className="para_navigate">
        {Object.entries(paraMap).map((item, index) => {
          const list = [];
          list.push(item[0] !== 'basic'
            ? <a
              key={index}
              onClick={() => { emitter.emit('toAnchor', item[0]); }}
            >{paraTagMap[item[0]].zhName}</a> : null);
          return list;
        })}
      </div>
    </div>);
  }
}
// Menu.propTypes = {
//   paraMap: React.PropTypes.object.isRequired,
//   paraTagMap: React.PropTypes.object.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Menu;
