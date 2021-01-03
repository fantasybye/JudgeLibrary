/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import EChart from 'echarts-for-react';
import Component from '../../constants/Component';
import '../../less/judgedetail/chart.less';

class Chart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { abilityOption } = this.props;
    return (<div className="ability_chart_div">
      <EChart option={abilityOption} style={{ width: '100%', height: '100%' }} />
    </div>);
  }
}
// Chart.propTypes = {
//   abilityOption: React.PropTypes.object.isRequired
// };
export default Chart;
