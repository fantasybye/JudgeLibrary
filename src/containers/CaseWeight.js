/**
 * Created by frank on 2017/7/16.
 */
import React from 'react';
import Component from '../constants/Component';
import Header from '../commons/Header';
import Radar from '../components/caseweight/Radar';
import Table from '../components/caseweight/Table';
import '../less/caseweight/caseweight.less';

class CaseWeight extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      caseName: '',
      complexity: 0,
      causeWeight: 0,
      table: {
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
      },
      options: {
        entityOption: {},
        procedureOption: {}
      }
    };
  }
  componentDidMount() {
    const url = document.location.href;
    if (url.indexOf('?') !== -1) {
      const search = window.location.hash.split('?')[1];
      const id = search ? search.split('&')[0].split('=')[1] : '';
      this.scoreChart(id);
    }
  }
  scoreChart = (id) => {
    this.$api.case.caseWeight.request({ id }).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const { complexity, type, esse, order, weight } = result.data;
        const caseName = result.data.caseName;
        let caseComplexity = 0;
        let causeWeight = 0;
        let caseType = 0;
        let tabs = [];
        if (complexity !== null) {
          caseComplexity = complexity.toFixed(3);
        }
        if (weight !== null) {
          causeWeight = weight.toFixed(3);
        }
        if (type === 'civil') {
          caseType = 0;
          tabs = [{
            id: 0,
            name: '民事案件实体权重指标统计',
            isActive: true
          }, {
            id: 1,
            name: '民事案件程序权重指标统计',
            isActive: false
          }];
        } else if (type === 'criminal') {
          caseType = 1;
          tabs = [{
            id: 0,
            name: '刑事案件实体权重指标统计',
            isActive: true
          }, {
            id: 1,
            name: '刑事案件程序权重指标统计',
            isActive: false
          }];
        }
        const entity = esse.score;
        const procedure = order.score;
        // 实体案件权重
        const esseLevelOne = esse.children;
        let esseLevelTwo = [];
        let esseLevelThree = [];
        esseLevelOne.forEach((child) => {
          let rowSpan = 0;
          child.children.forEach((grandchild) => {
            if (grandchild.children.length !== 0) {
              rowSpan += grandchild.children.length;
            } else {
              rowSpan += 1;
            }
          });
          Object.assign(child, { rowSpan });
          esseLevelTwo = esseLevelTwo.concat(child.children);
        });
        esseLevelTwo.forEach((child) => {
          let rowSpan = 1;
          if (child.children.length !== 0) {
            rowSpan = child.children.length;
            esseLevelThree = esseLevelThree.concat(child.children);
          } else {
            rowSpan = 1;
            esseLevelThree.push({ zhName: '-', score: child.score, value: child.value, power: child.power });
          }
          Object.assign(child, { rowSpan });
        });
        const entityValue = [];
        esseLevelOne.forEach(lo => (entityValue.push(lo.score.toFixed(3))));
        const entityMax = Math.max.apply(null, entityValue) + 0.3;
        const entityIndicator = [];
        esseLevelOne.forEach(lo => (entityIndicator.push({ text: lo.zhName, max: entityMax })));
        const entityOption = {
          backgroundColor: '#ffffff',
          tooltip: {
            trigger: 'axis'
          },
          title: {
            text: tabs[0].name,
            left: 'center',
            textStyle: {
              color: '#666666'
            }
          },
          radar: {
            shape: 'polygon',
            center: ['50%', '55%'],
            indicator: entityIndicator,
            name: {
              textStyle: {
                color: 'rgb(187, 187, 187)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(187, 187, 187, 0.5)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(187, 187, 187, 0.5)'
              }
            },
            splitArea: {
              areaStyle: {
                color: ['#FFFFFF', '#EFEFEF', '#FFFFFF', '#EFEFEF', '#FFFFFF']
              }
            }
          },
          color: ['#ED8A19', '#D14A61', '#FD9C35', '#675BBA', '#38D8FD', '#75707D'],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: { normal: { areaStyle: { type: 'default' } } },
              data: [
                {
                  value: entityValue,
                  name: '综合能力'
                }
              ]
            }
          ]
        };
        // 程序案件权重
        const orderLevelOne = order.children;
        let orderLevelTwo = [];
        let orderLevelThree = [];
        orderLevelOne.forEach((child) => {
          let rowSpan = 0;
          child.children.forEach((grandchild) => {
            if (grandchild.children.length !== 0) {
              rowSpan += grandchild.children.length;
            } else {
              rowSpan += 1;
            }
          });
          Object.assign(child, { rowSpan });
          orderLevelTwo = orderLevelTwo.concat(child.children);
        });
        orderLevelTwo.forEach((child) => {
          let rowSpan = 1;
          if (child.children.length !== 0) {
            rowSpan = child.children.length;
            orderLevelThree = orderLevelThree.concat(child.children);
          } else {
            rowSpan = 1;
            orderLevelThree.push({ zhName: '-', score: child.score, value: child.value, power: child.power });
          }
          Object.assign(child, { rowSpan });
        });
        const procedureValue = [];
        orderLevelOne.forEach(lo => (procedureValue.push(lo.score.toFixed(3))));
        const procedureMax = Math.max.apply(null, procedureValue) + 0.3;
        const procedureIndicator = [];
        orderLevelOne.forEach(lo => (procedureIndicator.push({ text: lo.zhName, max: procedureMax })));
        const procedureOption = {
          backgroundColor: '#ffffff',
          tooltip: {
            trigger: 'axis'
          },
          title: {
            text: tabs[1].name,
            left: 'center',
            textStyle: {
              color: '#666666'
            }
          },
          radar: {
            shape: 'polygon',
            center: ['50%', '55%'],
            indicator: procedureIndicator,
            name: {
              textStyle: {
                color: 'rgb(187, 187, 187)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(187, 187, 187, 0.5)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(187, 187, 187, 0.5)'
              }
            },
            splitArea: {
              areaStyle: {
                color: ['#FFFFFF', '#EFEFEF', '#FFFFFF', '#EFEFEF', '#FFFFFF']
              }
            }
          },
          color: ['#ED8A19', '#D14A61', '#FD9C35', '#675BBA', '#38D8FD', '#75707D'],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: { normal: { areaStyle: { type: 'default' } } },
              data: [
                {
                  value: procedureValue,
                  name: '综合能力'
                }
              ]
            }
          ]
        };
        this.setState({
          caseName,
          complexity: caseComplexity,
          causeWeight,
          table: {
            caseType,
            tabs,
            entity,
            procedure,
            esseLevels: {
              esseLevelOne,
              esseLevelTwo,
              esseLevelThree
            },
            orderLevels: {
              orderLevelOne,
              orderLevelTwo,
              orderLevelThree
            }
          },
          options: {
            entityOption,
            procedureOption
          }
        });
      }
    });
  };
  render() {
    const { caseName, complexity, causeWeight } = this.state;
    return (
      <div>
        <Header>
          <span className="detail-header">
            案件权重评价指标
          </span>
        </Header>
        <div className="options_div">
          <div className="case_weight_title">
            <div className="case_name">【{ caseName }】</div>
            <div className="complex">案件权重：<span className="complexity_span">{complexity}</span></div>
            <div className="complex">案由系数：<span className="complexity_span">{causeWeight}</span></div>
          </div>
        </div>
        <div className="case_complex_div">
          <Radar options={this.state.options} />
          <Table table={this.state.table} />
        </div>
        <div className="weight_description" ><img alt="" src={require('../assets/formula/case_weight_description.png')} /></div>
      </div>
    );
  }
}
export default CaseWeight;

