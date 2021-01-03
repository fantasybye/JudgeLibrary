import React from 'react';
import { Tooltip } from 'antd';
import Component from '../../constants/Component';
import '../../less/caseweight/table.less';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      caseType: 0, // 0为民事， 1为刑事
      tabs: [],
      entity: 0,
      procedure: 0,
      esseLevels: {
        esseLevelOne: [],
        esseLevelTwo: [],
        esseLevelThree: []
      },
      orderLevels: {
        orderLevelOne: [],
        orderLevelTwo: [],
        orderLevelThree: []
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    const { caseType, tabs, esseLevels, orderLevels, entity, procedure } = nextProps.table;
    this.setState({
      caseType,
      tabs,
      esseLevels,
      orderLevels,
      entity,
      procedure
    });
  }
  changeTab =(id) => {
    const tabs = this.state.tabs;
    tabs[id].isActive = true;
    tabs.forEach((tab) => {
      if (tab.id !== id) {
        tab.isActive = false;
      }
    });
    this.setState({
      tabs
    });
  };
  render() {
    const { caseType, tabs, esseLevels, orderLevels, entity, procedure } = this.state;
    const scoreTip = caseType === 0 ? '民事案件' : '刑事案件';
    return (
      <div>
        <div className="case_complex_tabs_div">
          <div className="case_complex_tabs_wrapper">
            <ul className="case_complex_tabs">
              {tabs.map((tab, index) => (
                <li key={index} className="case_complex_tab" >
                  <div className={tab.isActive ? 'case_complex_tab_inner active' : 'case_complex_tab_inner'} onClick={this.changeTab.bind(this, tab.id)}>
                    { tab.name }
                  </div>
                </li>))}
            </ul>
          </div>
        </div>
        {tabs.map((tab, index) => (
          tab.isActive ? <div key={index} className="score">
            <table className="scoreTable">
              <thead>
                <tr>
                  <th colSpan="3">
                    <p className="p1"><span>指标</span><span className="subtext">(指标权重)</span></p>
                    <p className="p2">
                      <span className="frontSpan">一级指标</span>
                      <span className="frontSpan">二级指标</span>
                      <span className="endSpan">三级指标</span>
                    </p>
                  </th>
                  <th><p className="p3">指标赋值</p></th>
                  <th><p className="p3">得分</p></th>
                </tr>
              </thead>
            </table>
            {tab.id === 0 ? <div className="innerTableDiv">
              <table className="innerTable">
                {esseLevels.esseLevelOne.map((item, id) => (
                  <tbody key={id}>
                    <tr >
                      <td rowSpan={item.rowSpan}>{item.zhName}<span className="weightSpan">{item.power}</span></td>
                    </tr>
                    {(() => {
                      const trs = [];
                      for (let i = 0; i < item.rowSpan - 1; i += 1) {
                        trs.push(<tr key={i} />);
                      }
                      return trs;
                    })()}
                  </tbody>))
                }
                <tbody>
                  <tr><td>总计</td></tr>
                </tbody>
              </table>
              <table className="innerTable">
                {esseLevels.esseLevelTwo.map((item, id) => (
                  <tbody key={id}>
                    <tr>
                      <td rowSpan={item.rowSpan}>
                        {item.description && item.description !== ''
                          ? <Tooltip title={item.description}>
                            <span>{item.zhName}</span>
                          </Tooltip>
                          : item.zhName}
                      </td>
                    </tr>
                    {(() => {
                      const trs = [];
                      for (let i = 0; i < item.rowSpan - 1; i += 1) {
                        trs.push(<tr key={i} />);
                      }
                      return trs;
                    })()}
                  </tbody>))}
                <tbody>
                  <tr><td>-</td></tr>
                </tbody>
              </table>
              <table className="innerTable levelThree">
                <tbody>
                  {esseLevels.esseLevelThree.map((item, i) => (
                    <tr key={i}>
                      <td>{item.description && item.description !== ''
                        ? <Tooltip title={item.description}>
                          <span>{item.zhName}</span>
                        </Tooltip>
                        : item.zhName}</td>
                      <td>{item.value}</td>
                      <td>{item.score.toFixed(3)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td style={{ color: '#ee8b12', fontWeight: 700 }}>
                      <Tooltip title={`${scoreTip}实体权重指标最终得分`}>
                        <span>{entity.toFixed(3)}</span>
                      </Tooltip></td>
                  </tr>
                </tbody>
              </table>
            </div> : null }
            {tab.id === 1 ? <div className="innerTableDiv">
              <table className="innerTable">
                {orderLevels.orderLevelOne.map((item, id) => (
                  <tbody key={id}>
                    <tr>
                      <td rowSpan={item.rowSpan}>{item.zhName}<span className="weightSpan">{item.power}</span></td>
                    </tr>
                    {(() => {
                      const trs = [];
                      for (let i = 0; i < item.rowSpan - 1; i += 1) {
                        trs.push(<tr key={i} />);
                      }
                      return trs;
                    })()}
                  </tbody>))
                }
                <tbody>
                  <tr><td>总计</td></tr>
                </tbody>
              </table>
              <table className="innerTable">
                {orderLevels.orderLevelTwo.map((item, id) => (
                  <tbody key={id}>
                    <tr>
                      <td rowSpan={item.rowSpan}>
                        {item.description && item.description !== ''
                          ? <Tooltip title={item.description}>
                            <span>{item.zhName}</span>
                          </Tooltip>
                          : item.zhName}</td>
                    </tr>
                    {(() => {
                      const trs = [];
                      for (let i = 0; i < item.rowSpan - 1; i += 1) {
                        trs.push(<tr key={i} />);
                      }
                      return trs;
                    })()}
                  </tbody>))}
                <tbody>
                  <tr><td>-</td></tr>
                </tbody>
              </table>
              <table className="innerTable levelThree">
                <tbody>
                  {orderLevels.orderLevelThree.map((item, i) => (
                    <tr key={i} >
                      <td>{item.description && item.description !== ''
                        ? <Tooltip title={item.description}>
                          <span>{item.zhName}</span>
                        </Tooltip>
                        : item.zhName}</td>
                      <td>{item.value}</td>
                      <td>{item.score.toFixed(3)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td style={{ color: '#ee8b12', fontWeight: 700 }}>
                      <Tooltip title={`${scoreTip}程序权重指标最终得分`}>
                        <span>{procedure.toFixed(3)}</span>
                      </Tooltip></td>
                  </tr>
                </tbody>
              </table>
            </div> : null }
          </div> : null)
        )}
      </div>);
  }
}
export default Table;
