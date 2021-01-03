/*
 * Created by frank on 2017/7/11.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import ECharts from 'echarts-for-react';
import Component from '../../constants/Component';
import '../../less/home/options.less';

class Options extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      left: 0, // 控制滚动参数
      shufflingId: 0,
      location: {},
      data: {
        judges: [{
          trialCount: 1298,
          judge: {
            name: '吕娜彬',
            searchType: 9,
            id: 105971828,
            department: '执行庭',
            courtName: '厦门市思明区人民法院',
            lastUpdateTime: 1470979851000,
            birthDate: -84441600000,
            sex: 2,
            courtId: '1617',
            caseCauseIds: [
              3104,
              3106,
              3107,
              3108,
              3109,
              3110,
              3111,
              3114,
              3103,
              3215
            ],
            categoryId: 4,
            workload: 33.75077038417997,
            starGrade: 5,
            age: 50,
            goodAtCause: '无擅长案由'
          },
          mediate: 0
        }
        ],
        comment: {
          avgTrialCount: 0,
          avgTrialTime: 0,
          avgQuality: 0,
          avgReasonLength: 0,
          avgQua: 0.0
        },
        radars: {
          maxReasonLength: 1,
          maxQuality: 1,
          maxTrialCount: 1,
          maxTrialTime: 1
        },
        map: {
          maxData: 0,
          minData: 0,
          maxCity: 0,
          minCity: 0,
          judgeTotal: 0,
          judgeDept: {},
          caseDept: {},
          mapAvgCaseTotal: [{
            name: '',
            value: '',
            key: ''
          }],
          mapJudgeTotal: {}
        },
        line: {
          categories: [],
          topDatas: [],
          middleDatas: [],
          bottomDatas: []
        },
        compare: {}
      },
      options: {
        abilityChartOption: {
          tooltip: {
            trigger: 'axis'
          },
          radar: [
            {
              indicator: [
                { text: '办案时长', max: 1 },
                { text: '办案数量', max: 1 },
                { text: '说理长度', max: 1 },
                { text: '文书字数', max: 1 }
              ],
              radius: 180
            }
          ],
          color: ['#ED8A19', '#D14A61', '#FD9C35', '#675BBA', '#38D8FD', '#75707D'],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item',
                formatter: () => {
                  let str = '<br/>';
                  str += '平均办案时长:0<br/>';
                  str += '平均办案数量:0<br/>';
                  str += '平均说理长度:0<br/>';
                  str += '平均文书字数:0';
                  return str;
                }
              },
              itemStyle: { normal: { areaStyle: { type: 'default' } } },
              data: [
                {
                  value: [0, 0, 0, 0],
                  name: '综合能力'
                }
              ]
            }
          ]
        },
        trendOption: {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          color: ['#D16E6B', '#AED4C3', '#DDA490', '#FD9C35', '#675BBA', '#75707D'],
          grid: {
            x: 50,
            y: 20,
            height: 250
          },
          series: {
            name: '',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: []
          }
        },
        mapOption: {
          series: []
        },
        judgeOption: {
          legend: {
            data: ['法官星级及对应人数图']
          },
          tooltip: {
            trigger: 'axis',
            formatter: '当前星级人数 : <br/>{b} : {c}人'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          xAxis: {
            type: 'category',
            axisLine: { onZero: false },
            boundaryGap: false,
            data: ['一星', '二星', '三星', '四星', '五星']
          },
          series: [
            {
              name: '法官星级及对应人数图',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  width: 3,
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 10,
                  shadowOffsetY: 10
                }
              },
              data: [0, 0, 0, 0, 0]
            }
          ]
        }
      }
    };
    this.timer = 0;
    this.timer_next = 0;
  }
  componentDidMount() {
    this.timer = setInterval(this.time, 5000);
    this.timer_next = setInterval(this.lefts, 5000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      location: nextProps.location,
      data: nextProps.data,
      options: nextProps.options
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.timer_next);
  }
  onChartClick = (param) => {
    let areaTypeNext = 1;
    if (!this.state.data.map.cityName) {
      areaTypeNext = 2;
    } else {
      areaTypeNext = 3;
    }
    Object.assign(this.$store.state.searchForm, { areaCode: param.data.key, areaType: areaTypeNext });
    HashLocation.push('/judge_search');
  };
  chooseChart = (shufflingId) => {
    this.setState({
      shufflingId
    });
  };
  // 跳转法官详情页
  goDetail = (id) => {
    window.open(`${window.location.href.split('#')[0]}#/judge_detail?judgeId=${id}`);
  };
  // 清除定时器
  clearInt = () => {
    clearTimeout(this.timer);
    clearTimeout(this.timer_next);
  };
  // 重启定时器
  recoverInt = () => {
    this.timer = setInterval(this.time, 5000);
    this.timer_next = setInterval(this.lefts, 5000);
  };
  // 首页选项卡定时时间控制
  time = () => {
    let shufflingId = this.state.shufflingId;
    let left = 0;
    if (shufflingId >= 0 && shufflingId < 4) {
      shufflingId = parseInt(shufflingId, 10) + 1;
      left = -932 * shufflingId;
    } else if (shufflingId === 4) {
      shufflingId = 0;
      left = 0;
    }
    this.setState({
      shufflingId,
      left
    });
  };
  // 首页选项卡滚动控制
  lefts = () => {
    let left = this.state.left;
    if (left <= 0 && left > -4 * 932) {
      left -= 932;
    } else if (left === -4 * 932) {
      left = 0;
    }
    this.setState({
      left
    });
  };
  render() {
    const { location, left, shufflingId } = this.state;
    const { judges, comment, map } = this.state.data;
    const dict = (() => {
      if (location.areaType === 1) {
        return <span >省</span>;
      } else if (location.areaType === 3) {
        return <span >区</span>;
      }
      return <span >市</span>;
    })();
    return (
      <div className="wrapper">
        <div className="statistic_div" >
          <div
            className="choose_div clearfix"
            onMouseOver={this.clearInt.bind(this)}
            onMouseOut={this.recoverInt.bind(this)}
          >
            <div
              className={shufflingId === 0 ? 'chart_choose recommend_navi chosen' : 'chart_choose recommend_navi'}
              onClick={this.chooseChart.bind(this, 0)}
            >
              <img alt="" src={require('../../assets/home/options/icon_medal.png')} /><span>本院法官</span>
            </div>
            <div className="separator">|</div>
            <div
              className={shufflingId === 1 ? 'chart_choose comment_navi chosen' : 'chart_choose comment_navi'}
              onClick={this.chooseChart.bind(this, 1)}
            >
              <img alt="" src={require('../../assets/home/options/icon_ability.png')} /><span>法官评价指标</span>
            </div>
            <div className="separator">|</div>
            <div
              className={shufflingId === 2 ? 'chart_choose avg_navi chosen' : 'chart_choose avg_navi'}
              onClick={this.chooseChart.bind(this, 2)}
            >
              <img alt="" src={require('../../assets/home/options/icon_case.png')} /><span>历史人均办案量</span>
            </div>
            <div className="separator">|</div>
            <div
              className={shufflingId === 3 ? 'chart_choose map_navi chosen' : 'chart_choose map_navi'}
              onClick={this.chooseChart.bind(this, 3)}
            >
              <img alt="" src={require('../../assets/home/options/icon_province.png')} />
              <span>全{dict}法官资源配置</span>
            </div>
            <div className="separator">|</div>
            <div
              className={shufflingId === 4 ? 'chart_choose avg_navi chosen' : 'chart_choose avg_navi'}
              onClick={this.chooseChart.bind(this, 4)}
            >
              <img alt="" src={require('../../assets/home/options/icon_case.png')} /><span>法官星级分布图</span>
            </div>
          </div>
          <div
            className="chart_div"
            onMouseOver={this.clearInt.bind(this)}
            onMouseOut={this.recoverInt.bind(this)}
          >
            {/* 本院法官*/}
            { shufflingId === 0 ? <div
              className="chart recommend_navi"
            >
              <div className="box">
                <div className="swiper-wrapper judges" style={{ left: `${left}px` }}>
                  {judges.map((judge, index) => (
                    <div key={index} className="swiper-slide">
                      <div className="judge">
                        <div className="member-info" onClick={this.goDetail.bind(this, judge.judge.id)}>
                          <h3>{judge.judge.name}</h3>
                          <h5>{judge.judge.department}</h5>
                          <div className="star">
                            {(() => {
                              const imgs = [];
                              for (let i = 0; i < judge.judge.starGrade || 0; i += 1) {
                                imgs.push(<img key={i} alt="" src={require('../../assets/judge/judge_icon_star_choose.png')} />);
                              }
                              return imgs;
                            })()}
                            {(() => {
                              const imgs = [];
                              for (let i = 0; i < 5 - (judge.judge.starGrade || 0); i += 1) {
                                imgs.push(<img key={i} alt="" src={require('../../assets/judge/judge_icon_star_normal.png')} />);
                              }
                              return imgs;
                            })()}
                          </div>
                          <h5>
                            <img alt="擅长案由" src={require('../../assets/judge/icon_good.png')} />
                            <span title="擅长案由">{judge.judge.goodAtCause}</span>
                          </h5>
                        </div>
                        <div className="member-image">
                          <span>
                            {(() => {
                              if (!judge.judge.sex || judge.judge.sex === 1 || judge.judge.sex === null) {
                                return <img alt="" src={require('../../assets/sex/man.png')} />;
                              }
                              return <img alt="" src={require('../../assets/sex/woman.png')} />;
                            })()}
                          </span>
                        </div>
                        <div className="more-info">
                          <div className="info">
                            <span>法官工作量: </span>
                            <span>
                              {(() => {
                                if (judge.judge.workload !== null && judge.judge.workload !== 0) {
                                  return <span className="value">{judge.judge.workload.toFixed(2)}</span>;
                                }
                                return <span className="value">-</span>;
                              })()}
                            </span>
                          </div>
                          <div className="info">
                            <span>案件数: </span>
                            <span className="value">{judge.trialCount}</span>
                            <span> 件</span>
                          </div>
                          <div className="go_detail">
                            <div className="go_btn" id={judge.judge.id} onClick={this.goDetail.bind(this, judge.judge.id)} />
                          </div>
                        </div>
                      </div>
                    </div>)
                  )}
                </div>
              </div>
              <div className="move_recommend">
                {(() => {
                  const spans = [];
                  for (let i = 0; i < 5; i += 1) {
                    spans.push(<span
                      key={i}
                      className={(this.state.left / -932) === i ? 'chosen' : ''}
                      onClick={() => {
                      // 选项卡内容区控制
                        this.setState({
                          left: i * -932
                        });
                      }}
                    >●</span>);
                  }
                  return spans;
                })()}
              </div>
            </div> : null}
            {/* 法官评价指标*/}
            { shufflingId === 1 ? <div className="chart comment_navi">
              <div id="comment_chart" className="comment_chart" >
                <ECharts option={this.state.options.abilityChartOption} style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="comment_data">
                <ul>
                  <li>
                    <span className="flag">◆</span>
                    <span>全{dict}法官年均平均办案数量为</span>
                    <span className="data" id="avgTrialCount">{comment.avgDocCount}</span>
                    <span className="unit">件</span>
                  </li>
                  <li>
                    <span className="flag">◆</span>
                    <span>全{dict}法官年均平均工作量为</span>
                    <span className="data" id="avgTrialTime">{comment.avgWorkload}</span>
                  </li>
                  <li>
                    <span className="flag">◆</span>
                    <span>全{dict}法官年均平均程序权重为</span>
                    <span className="data" id="avgQuality" >{comment.avgOrder}</span>
                  </li>
                  <li>
                    <span className="flag">◆</span>
                    <span>全{dict}法官年均平均实体权重为</span>
                    <span className="data" id="avgQuality" >{comment.avgEsse}</span>
                  </li>
                </ul>
              </div>
            </div> : null }
            {/* 历史人均办案量*/}
            { shufflingId === 2 ? <div className="chart avg_navi" >
              <div id="avg_chart" className="avg_chart" >
                <ECharts option={this.state.options.trendOption} style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="avg_data">
                <span className="flag">◆</span>
                全{dict}法官人均办案量总体呈上升趋势</div>
            </div> : null }
            {/* 全省法官资源配置*/}
            { shufflingId === 3 ? <div className="chart map_navi" >
              <div id="map_chart" className="map_chart" >
                <ECharts
                  option={this.state.options.mapOption}
                  style={{ width: '100%', height: '100%' }}
                  // 添加地图点击事件，此处跳转search页面且将城市id加入searchForm
                  onEvents={{ click: this.onChartClick }}
                />
              </div>
              <div className="map_data">
                <ul>
                  <li>
                    <span className="flag">◆</span>
                    <span>全{dict}法官人均普遍办案量较多</span>
                  </li>
                  {location.areaType !== 3
                    ? <div>
                      <li className="province">
                        <span className="flag">◆</span>
                        <span>
                          <span className="city">{map.maxCity}</span>
                          法官人均办案数量最多
                        </span>
                      </li>
                      <li className="province">
                        <span className="flag">◆</span>
                        <span>
                          <span className="city">{map.minCity}</span>
                          法官人均办案数量最少
                        </span>
                      </li>
                    </div>
                    : <div>
                      <li>
                        <span className="flag">◆</span>
                        <span>全{dict}法官总数<span className="data">{map.judgeTotal}</span>人</span>
                        <p className="first-line">
                          <span>民事审判庭<span className="detail">{map.judgeDept.civilJudgeCount}</span>人</span>
                          <span>刑事审判庭<span className="detail">{map.judgeDept.crimeJudgeCount}</span>人</span>
                        </p>
                        <p>
                          <span>行政审判庭<span className="detail">{map.judgeDept.adminJudgeCount}</span>人</span>
                          <span>少年庭 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="detail">{map.judgeDept.teenJudgeCount}</span>人</span>
                        </p>
                        <p><span>其他 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="detail">{map.judgeDept.othersJudgeCount}</span>人</span></p>
                      </li>
                      <li>
                        <span className="flag">◆</span>
                        <span>全{dict}平均办案数量<span className="data">{map.avgCaseTotal}</span>件</span>
                        <p className="first-line">
                          <span>民事审判庭<span className="detail">{map.caseDept.civilCaseCount}</span>件</span>
                          <span>刑事审判庭<span className="detail">{map.caseDept.crimeCaseCount}</span>件</span>
                        </p>
                        <p>
                          <span>行政审判庭<span className="detail">{map.caseDept.adminCaseCount}</span>件</span>
                          <span>少年庭 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="detail">{map.caseDept.teenCaseCount}</span>件</span>
                        </p>
                        <p><span>其他 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="detail">{map.caseDept.othersCaseCount}</span>件</span></p>
                      </li>
                    </div>
                  }
                </ul>
              </div>
            </div> : null }
            {/* 首页法官星级对比图*/}
            { shufflingId === 4 ? <div className="chart judge_navi">
              <div id="judge_compare" className="avg_chart" >
                <ECharts
                  option={this.state.options.judgeOption}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div> : null }
          </div>
        </div>
      </div>
    );
  }
}
// Options.propTypes = {
//   location: PropTypes.object.isRequired,
//   data: PropTypes.object.isRequired,
//   options: PropTypes.object.isRequired
// };
export default Options;
