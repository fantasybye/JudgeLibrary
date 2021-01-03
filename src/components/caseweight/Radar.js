import React from 'react';
import echarts from 'echarts';
import Component from '../../constants/Component';
import '../../less/caseweight/radar.less';

class Radar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { entityOption, procedureOption } = nextProps.options;
    echarts.init(document.getElementById('entity_chart')).setOption(entityOption);
    echarts.init(document.getElementById('procedure_chart')).setOption(procedureOption);
  }
  render() {
    return (
      <div className="radar_div">
        <div className="radar_wrapper">
          <div id="entity_chart" className="score_chart" />
        </div>
        <div className="radar_wrapper">
          <div id="procedure_chart" className="score_chart" />
        </div>
      </div>
    );
  }
}
// Radar.propTypes = {
//   options: React.PropTypes.object.isRequired
// };
export default Radar;
