/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import Component from '../constants/Component';
import Header from '../commons/Header';
import Conditions from '../components/judgedetail/Conditions';
import Title from '../components/judgedetail/Title';
import Chart from '../components/judgedetail/Chart';
import Analysis from '../components/judgedetail/Analysis';
import Cases from '../components/judgedetail/Cases';
// import Comments from '../components/judgedetail/Comments';
import '../less/judgedetail/judgedetail.less';

const EventEmitter = require('events').EventEmitter;

class JudgeDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailLoading: false,
      detailDateShow: false,
      judgeDetail: {
        judge: {}
      },
      relativeCases: {
        caseInfos: [],
        pager: {
          count: 0,
          currentpage: 1,
          pagecount: 0,
          limit: 0,
          currentIndex: 0
        }
      },
      proceedingMap: {},
      docTypeMap: {},
      caseCauses: [],
      caseCausesNum: [],
      goodAt: {},
      options: {
        abilityOption: {
          title: {
            text: '综合能力分析图',
            left: 'left',
            textStyle: {
              color: '#28567A'
            }
          },
          color: ['#97b697', '#DDA490', '#D16E6B'],
          series: []
        },
        trendOption: {
          color: ['#97b697', '#DDA490', '#D16E6B'],
          series: []
        },
        statusOption: {
          series: []
        },
        complexOption: {
          series: []
        },
        caseOption: {
          series: []
        },
        docCountOption: {
          series: []
        },
        reasonOption: {
          series: []
        },
        docOption: {
          series: []
        },
        proceedingOption: {
          series: []
        }
      },
      complexityWhole: {},
      complexityFocus: {},
      horizonsChosen0: false,
      horizonsChosen1: false,
      horizonsChosen2: false,
      horizonsChosen3: false,
      statusData: {
        allCount: 0,
        judgeCount: 0,
        underTakerCount: 0,
        data: [],
        collegialCount: 0
      },
      complexData: {
        simpleCount: 0,
        commonCount: 0
      }
    };
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.emitter.on('loading', this.loadingOn.bind(this));
    this.emitter.on('refresh', this.detailRefresh.bind(this));
    this.emitter.on('chooseHorizon', this.chooseHorizon.bind(this));
    this.emitter.on('changePage', this.changePage.bind(this));
    const url = document.location.href;
    if (url.indexOf('?') !== -1) {
      const search = window.location.hash.split('?')[1];
      const id = search ? search.split('&')[0].split('=')[1] : '';
      this.getData(id);
    }
  }
  componentDidMount() {
    const element = document.getElementById('judge_detail_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.attachEvent('onclick', this.showDate.bind(this));
    } else {
      element.addEventListener('click', this.showDate.bind(this));
    }
    this.data();
    this.statusChart();
  }
  componentWillUnmount() {
    const element = document.getElementById('judge_detail_wrapper');
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      element.detachEvent('onclick', this.showDate.bind(this));
    } else {
      element.removeEventListener('click', this.showDate.bind(this));
    }
  }
  getData = (id) => {
    Object.assign(this.$store.state.judgeForm, { judgeId: id });
    this.detailRefresh();
  };
  data = () => {
    this.abilityChart();
    this.trendChart();
    this.caseSection();
    this.reasonSection();
    this.docSection();
  };
  chooseHorizon = (index) => {
    const { horizonsChosen0, horizonsChosen1, horizonsChosen2, horizonsChosen3 } = this.state;
    const judgeForm = this.$store.state.judgeForm;
    if (index === 0 && !horizonsChosen0) {
      this.setState({
        detailLoading: true
      });
      this.abilityChart();
      this.trendChart();
      this.caseSection();
      this.reasonSection();
      this.docSection();
      this.$api.judge.detail.request(judgeForm).then(({ data }) => {
        if (data.code === 0) {
          const judgeDetail = data.data;
          this.setState({
            detailLoading: false,
            horizonsChosen0: true,
            judgeDetail
          });
        }
      });
    }
    if (index === 1 && !horizonsChosen1) {
      this.statusChart();
      this.setState({
        horizonsChosen1: true
      });
    }
    if (index === 2 && !horizonsChosen2) {
      this.setState({
        detailLoading: true
      });
      this.$api.judge.goodAt.request({ judgeId: judgeForm.judgeId }).then(({ data }) => {
        if (data.code === 0) {
          const goodAt = data.data;
          this.setState({
            detailLoading: false,
            horizonsChosen2: true,
            goodAt
          });
        }
      });
    }
    if (index === 3 && !horizonsChosen3) {
      this.setState({
        detailLoading: true
      });
      this.complexChart();
      Promise.all([
        this.$api.judge.complexityWhole.request(judgeForm),
        this.$api.judge.complexityFocus.request(judgeForm)
      ]).then((results) => {
        let complexityWhole = {};
        let complexityFocus = {};
        if (results[0].data.code === 0) { complexityWhole = results[0].data.data; }
        if (results[1].data.code === 0) { complexityFocus = results[1].data.data; }
        this.setState({
          complexityWhole,
          complexityFocus,
          detailLoading: false,
          horizonsChosen3: true
        });
      });
    }
  };
  // 综合能力分析图
  abilityChart = () => {
    this.$api.detail.abilityChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const ability = {
          maxWorkload: result.data.maxWorkload === 0 ? 0 : result.data.maxWorkload,
          maxDocCount: result.data.maxDocCount === 0 ? 0 : result.data.maxDocCount,
          maxSession: result.data.maxSession === 0 ? 0 : result.data.maxSession,
          maxDiscussion: result.data.maxDiscussion === 0 ? 0 : result.data.maxDiscussion,
          maxReception: result.data.maxReception === 0 ? 0 : result.data.maxReception,
          maxAvgEsse: result.data.maxAvgEsse === 0 ? 0 : result.data.maxAvgEsse,
          maxAvgOrder: result.data.maxAvgOrder === 0 ? 0 : result.data.maxAvgOrder,
          avgWorkload: result.data.avgWorkload === 0 ? 0 : result.data.avgWorkload,
          avgDocCount: result.data.avgDocCount === 0 ? 0 : result.data.avgDocCount,
          avgSession: result.data.avgSession === 0 ? 0 : result.data.avgSession,
          avgDiscussion: result.data.avgDiscussion === 0 ? 0 : result.data.avgDiscussion,
          avgReception: result.data.avgReception === 0 ? 0 : result.data.avgReception,
          avgEsse: result.data.avgEsse === 0 ? 0 : result.data.avgEsse,
          avgOrder: result.data.avgOrder === 0 ? 0 : result.data.avgOrder,
          workload: result.data.workload,
          docCount: result.data.docCount,
          session: result.data.session,
          discussion: result.data.discussion,
          reception: result.data.reception,
          esse: result.data.esse,
          order: result.data.order
        };
        const standard = [
          { text: '平均实体权重', max: ability.maxAvgEsse.toFixed(10) },
          { text: '平均程序权重', max: ability.maxAvgOrder.toFixed(10) },
          { text: '法官工作量', max: ability.maxWorkload.toFixed(10) },
          { text: '合议庭讨论次数', max: ability.maxDiscussion.toFixed(0) },
          { text: '接待当事人次数', max: ability.maxReception.toFixed(0) },
          { text: '开庭次数', max: ability.maxSession.toFixed(0) },
          { text: '案件总数', max: ability.maxDocCount.toFixed(0) }
        ];
        const data = [{
          value: [
            ability.esse === 0 ? 0 : ability.esse.toFixed(2),
            ability.order === 0 ? 0 : ability.order.toFixed(2),
            ability.workload === 0 ? 0 : ability.workload.toFixed(2),
            ability.discussion === 0 ? 0 : ability.discussion.toFixed(0),
            ability.reception === 0 ? 0 : ability.reception.toFixed(0),
            ability.session === 0 ? 0 : ability.session.toFixed(0),
            ability.docCount === 0 ? 0 : ability.docCount.toFixed(0)
          ],
          name: '该法官综合能力'
        }, {
          value: [
            ability.avgEsse === 0 ? 0 : ability.avgEsse.toFixed(2),
            ability.avgOrder === 0 ? 0 : ability.avgOrder.toFixed(2),
            ability.avgWorkload === 0 ? 0 : ability.avgWorkload.toFixed(2),
            ability.avgDiscussion === 0 ? 0 : ability.avgDiscussion.toFixed(0),
            ability.avgReception === 0 ? 0 : ability.avgReception.toFixed(0),
            ability.avgSession === 0 ? 0 : ability.avgSession.toFixed(0),
            ability.avgDocCount === 0 ? 0 : ability.avgDocCount.toFixed(0)
          ],
          name: '所有法官平均值'
        }];
        const abilityOption = {
          title: {
            text: '综合能力分析图',
            left: 'left',
            textStyle: {
              color: '#28567A'
            }
          },
          tooltip: {},
          legend: {
            data: ['该法官综合能力', '所有法官平均值'],
            right: 2,
            top: 2
          },
          radar: [
            {
              center: ['50%', '55%'],
              indicator: standard,
              radius: 150
            }
          ],
          color: ['#97b697', '#fba747', '#D16E6B'],
          series: [
            {
              type: 'radar',
              itemStyle: { normal: { areaStyle: { type: 'default' } } },
              data
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { abilityOption });
        this.setState({
          options
        });
      }
    });
  };
  // 历年趋势图
  trendChart = () => {
    this.$api.detail.trendChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const trendData = {
          categories: result.data.categories.length === 0 ? [0] : result.data.categories,
          datas: result.data.datas.length === 0 ? [0] : result.data.datas
        };
        let cut = 0;
        while (cut < trendData.datas.length && trendData.datas[cut].value < 1) {
          cut += 1;
        }
        const trendOption = {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            itemGap: 200,
            itemSize: 505
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: trendData.categories.slice(cut)
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          grid: {
            x: 50,
            y: 20,
            height: 150
          },
          color: ['#97b697', '#DDA490', '#D16E6B'],
          series: [
            {
              name: '办案数量',
              type: 'line',
              smooth: true,
              itemStyle: { normal: { areaStyle: { type: 'default' } } },
              data: trendData.datas.slice(cut)
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { trendOption });
        this.setState({
          options
        });
      }
    });
  };
  // 不同身份办案时长统计
  // (result.judgeCount != 0 && result.underTakerCount != 0 && result.collegialCount != 0)时才画图
  statusChart = () => {
    this.setState({
      detailLoading: true
    });
    this.$api.detail.statusChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const statusData = result.data;
        const dataStyle = {
          normal: {
            label: { show: false },
            labelLine: { show: false }
          }
        };
        const placeHolderStyle = {
          normal: {
            color: 'rgba(0,0,0,0)',
            label: { show: false },
            labelLine: { show: false }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        };
        const statusOption = {
          title: {
            text: '不同身份',
            x: 140,
            y: 170,
            itemGap: 20,
            textStyle: {
              color: 'rgba(83,83,83,0.4)',
              fontFamily: '微软雅黑',
              fontSize: 30,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            show: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 350,
            y: 45,
            itemGap: 12,
            textStyle: {
              fontSize: 15
            },
            data: statusData.data// ['审判长', '承办人', '参与合议人']
          },
          toolbox: {
            left: 15,
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          color: ['#97b697', '#DDA490', '#D16E6B'],
          series: [
            {
              name: '',
              type: 'pie',
              clockWise: false,
              radius: [125, 150],
              center: ['35%', '50%'],
              itemStyle: dataStyle,
              data: [
                {
                  value: statusData.judgeCount,
                  name: statusData.data[0]// '审判长'
                }, {
                  value: statusData.allCount - statusData.judgeCount,
                  name: 'other',
                  itemStyle: placeHolderStyle
                }
              ]
            }, {
              name: '',
              type: 'pie',
              clockWise: false,
              radius: [100, 125],
              center: ['35%', '50%'],
              itemStyle: dataStyle,
              data: [
                {
                  value: statusData.underTakerCount,
                  name: statusData.data[1]// '承办人'
                }, {
                  value: statusData.allCount - statusData.underTakerCount,
                  name: 'other',
                  itemStyle: placeHolderStyle
                }
              ]
            }, {
              name: '',
              type: 'pie',
              clockWise: false,
              radius: [75, 100],
              center: ['35%', '50%'],
              itemStyle: dataStyle,
              data: [
                {
                  value: statusData.collegialCount,
                  name: statusData.data[2]// '参与合议人'
                }, {
                  value: statusData.allCount - statusData.collegialCount,
                  name: 'other',
                  itemStyle: placeHolderStyle
                }
              ]
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { statusOption });
        this.setState({
          options,
          detailLoading: false,
          statusData
        });
      }
    });
  };
  // 案件权重图
  // (result.simpleCount != 0 && result.commonCount != 0)时才画
  complexChart = () => {
    this.$api.detail.complexChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const complexData = {
          simpleCount: result.data.simpleCount,
          commonCount: result.data.commonCount
        };
        const proceedingOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#97b697', '#DDA490', '#D16E6B'],
          series: [
            {
              name: '诉讼程序',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: complexData.simpleCount, name: '简易程序' },
                { value: complexData.commonCount, name: '普通程序' }
              ],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'outer',
                    textStyle: {
                      fontSize: 20
                    }
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { proceedingOption });
        this.setState({
          options,
          complexData
        });
      }
    });
  };
  // 法官办案数量所在区间图
  caseSection = () => {
    this.$api.detail.caseChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const caseData = {
          y1Param: result.data.y1Param,
          y2Param: result.data.y2Param,
          xParam: result.data.xParam,
          judgeworkload: result.data.judgeworkload
        };
        const y1 = [];
        const y2 = [];
        for (let i = 0;i < caseData.y1Param.length; i += 1) {
          y1.push(caseData.y1Param[i] * caseData.y2Param[i]);
          if (caseData.y2Param[i] === 0) {
            y2.push(caseData.y1Param[i]);
          } else {
            y2.push(0);
          }
        }
        const caseOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(a) {
              const value = a[0].value || a[1].value;
              let str = `区间：${a[0].name}<br/>` ;
              str += `法官人数：${value}人`;
              return str;
            }
          },
          legend: {
            data: ['该法官所在区间', '其他法官'],
            right: 20,
            top: 20
          },
          title: {
            text: '办案数量分布图',
            left: 30,
            top: 20,
            itemGap: 20,
            textStyle: {
              color: '#28567A',
              fontSize: 20,
              fontWeight: 'bolder'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#D16E6B', '#97b697', '#DDA490'],
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: caseData.xParam,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                formatter: '{value} 件'
              }
            }
          ],
          series: [
            {
              name: '该法官所在区间',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: y1
            },
            {
              name: '其他法官',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: y2
            }
          ]
        };
        const docCountOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(a) {
              const value = a[0].value || a[1].value;
              let str = `区间：${a[0].name}<br/>` ;
              str += `法官人数：${value}人`;
              return str;
            }
          },
          legend: {
            data: ['该法官所在区间', '其他法官'],
            right: 20,
            top: 20
          },
          title: {
            text: '文书数量分布图',
            left: 30,
            top: 20,
            itemGap: 20,
            textStyle: {
              color: '#28567A',
              fontSize: 20,
              fontWeight: 'bolder'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#D16E6B', '#97b697', '#DDA490'],
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: caseData.xParam,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                formatter: '{value} 件'
              }
            }
          ],
          series: [
            {
              name: '该法官所在区间',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: y1
            },
            {
              name: '其他法官',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: y2
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { caseOption, docCountOption });
        this.setState({
          options
        });
      }
    });
  };
  // 法官说理长度直方图
  reasonSection = () => {
    this.$api.detail.reasonChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const reasonData = {
          courtReasonLength: result.data.courtReasonLength,
          judgeReasonLength: result.data.judgeReasonLength,
          keyList: result.data.keyList
        };
        const reasonOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['该法官文书篇数', '该院法官文书篇数'],
            right: 30
          },
          title: {
            text: '说理长度分布图',
            left: 30,
            itemGap: 20,
            textStyle: {
              color: '#28567A',
              fontSize: 20,
              fontWeight: 'bolder'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#ED8A19', '#97b697', '#DDA490'],
          yAxis: [
            {
              type: 'category',
              data: reasonData.keyList,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                formatter: '{value} 字'
              }
            }
          ],
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 篇'
              }
            }
          ],
          series: [
            {
              name: '该法官文书篇数',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: reasonData.judgeReasonLength
            },
            {
              name: '该院法官文书篇数',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: reasonData.courtReasonLength
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { reasonOption });
        this.setState({
          options
        });
      }
    });
  };
  // 法官文书字数直方图
  docSection = () => {
    this.$api.detail.docTypeChart.request(this.$store.state.judgeForm).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const docData = {
          courtDocLength: result.data.courtDocLength,
          judgeDocLength: result.data.judgeDocLength,
          keyList: result.data.keyList
        };
        const docOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['该法官文书篇数', '该院法官文书篇数'],
            right: 30
          },
          title: {
            text: '文书字数分布图',
            left: 30,
            itemGap: 20,
            textStyle: {
              color: '#28567A',
              fontSize: 20,
              fontWeight: 'bolder'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#ED8A19', '#97b697', '#DDA490'],
          yAxis: [
            {
              type: 'category',
              data: docData.keyList,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                formatter: '{value} 字'
              }
            }
          ],
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 篇'
              }
            }
          ],
          series: [
            {
              name: '该法官文书篇数',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: docData.judgeDocLength
            },
            {
              name: '该院法官文书篇数',
              type: 'bar',
              barWidth: '60%',
              stack: '总量',
              label: {
                normal: {
                  show: false
                }
              },
              data: docData.courtDocLength
            }
          ]
        };
        const options = this.state.options;
        Object.assign(options, { docOption });
        this.setState({
          options
        });
      }
    });
  };
  loadingOn = () => {
    this.setState({
      detailLoading: true
    });
  };
  changePage = (data) => {
    this.setState({
      relativeCases: data,
      detailLoading: false
    });
  };
  detailRefresh = () => {
    this.setState({
      detailLoading: true,
      horizonsChosen1: false,
      horizonsChosen2: false,
      horizonsChosen3: false
    });
    const judgeForm = this.$store.state.judgeForm;
    this.data();
    this.statusChart();
    Promise.all([
      this.$api.judge.detail.request(judgeForm),
      this.$api.detail.showExample.request(judgeForm)
    ]).then((results) => {
      let judgeDetail = {};
      let caseCauses = [];
      let caseCausesNum = [];
      let relativeCases = {};
      if (results[0].data.code === 0) {
        judgeDetail = results[0].data.data;
        caseCauses = judgeDetail.caseCauses;
        caseCausesNum = judgeDetail.caseCausesNum;
      }
      if (results[1].data.code === 0) {
        relativeCases = results[1].data.data;
      }
      this.setState({
        judgeDetail,
        caseCauses,
        caseCausesNum,
        relativeCases,
        proceedingMap: judgeDetail.proceedingMap || {},
        docTypeMap: judgeDetail.docTypeMap || {},
        detailLoading: false,
        horizonsChosen0: true
      });
    });
  };
  showDate = () => {
    if (event.target.className) {
      const className = event.target.className;
      if (className !== 'date_wrapper'
        && className !== 'time-select'
        && className !== 'select'
        && className !== 'time_item'
        && className !== 'ant-calendar-picker-input ant-input'
        && className !== 'ant-calendar-picker-icon') {
        this.setState({
          detailDateShow: false
        });
      }
    }
  };
  render() {
    const { detailLoading, detailDateShow, caseCauses, relativeCases, statusData,
      complexData, options, goodAt, judgeDetail, proceedingMap, docTypeMap,
      complexityWhole, complexityFocus, caseCausesNum } = this.state;
    return (<div id="judge_detail_wrapper" className="detail_wrapper">
      <Header>
        <span className="detail-header">
        法官审务单
        </span>
      </Header>
      {/* 内容详情*/}
      <div className="details_div">
        {detailLoading ? <div className="loading">
          <Spin size="large" />
        </div> : null}
        {/* 个人信息*/}
        <Title judge={judgeDetail.judge} />
        <div className="statistics clearfix" >
          {/* 数据分析*/}
          <Analysis
            judgeDetail={judgeDetail}
            statusData={statusData}
            complexData={complexData}
            options={options}
            proceedingMap={proceedingMap}
            docTypeMap={docTypeMap}
            goodAt={goodAt}
            complexityWhole={complexityWhole}
            complexityFocus={complexityFocus}
            emitter={this.emitter}
          />
          {/* 综合能力分析图*/}
          <Chart abilityOption={options.abilityOption} />
        </div>
        {/* 筛选条件*/}
        <Conditions
          dateShow={detailDateShow}
          caseCauses={caseCauses}
          emitter={this.emitter}
        />
        {/* 相关案例*/}
        <Cases
          detailLoading={detailLoading}
          caseCauses={caseCauses}
          caseCausesNum={caseCausesNum}
          relativeCases={relativeCases}
          emitter={this.emitter}
        />
        {/* 评价*/}
        {/* <Comments />*/}
      </div>
    </div>);
  }
}
export default JudgeDetail;
