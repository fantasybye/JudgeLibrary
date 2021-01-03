/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import '../../less/comment/table.less';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { starData } = this.props;
    return (<div className="star_comment_div">
      <table className="classNameify">
        <thead>
          <tr>
            <th>案由</th>
            <th>案由系数</th>
            <th>平均案件权重</th>
            <th>案件数量</th>
            <th>得分</th>
          </tr>
        </thead>
        <tbody>
          {starData.datas.map((item, index) => {
            const trs = [];
            trs.push(<tr key={index}>
              <td>{item.caseCause.name === '民事案' ? '其他民事纠纷' : item.caseCause.name}</td>
              <td>{parseFloat(item.weight).toFixed(3) || 0}</td>
              <td>{parseFloat(item.avgComplexity).toFixed(3) || 0}</td>
              <td>{item.caseCount}</td>
              <td>{(item.weight * item.avgComplexity * item.caseCount).toFixed(3)}</td>
            </tr>);
            return trs;
          })}
          <tr>
            <td>总计</td>
            <td>—</td>
            <td>{parseFloat(starData.judgeAvg).toFixed(3) || 0}</td>
            <td>{starData.caseTotal || 0}</td>
            <td>{parseFloat(starData.score).toFixed(3) || 0}</td>
          </tr>
        </tbody>
      </table>
      <div className="description">
        <img alt="" src={require('../../assets/formula/star_comment_description.png')} />
      </div>
    </div>);
  }
}
// Table.propTypes = {
//   starData: React.PropTypes.object.isRequired
// };
export default Table;
