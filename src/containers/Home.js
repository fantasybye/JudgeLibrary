/*
 * Created by frank on 2017/7/11.
 */
import React from 'react';
import Component from '../constants/Component';
import Header from '../components/home/Header';
import Options from '../components/home/Options';
import Title from '../components/home/Title';
import '../less/home/home.less';

require('../static/map/city/jinan');
require('../static/map/city/fuzhou');
require('../static/map/city/suzhou');
require('../static/map/city/xiamen');
require('../static/map/town/simingqu');
require('../static/map/town/huqiuqu');

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location: {},
      amount: {
        judge: [4, 5, 6, 7],
        cases: [2, 8, 0, 2, 3, 6]
      },
      data: {
        judges: [],
        comment: {
          avgWorkload: 0,
          avgDocCount: 0,
          avgEsse: 0,
          avgOrder: 0,
          avgQua: 0.0
        },
        radars: {
          maxAvgOrder: 1,
          maxAvgEsse: 1,
          maxWorkload: 1,
          maxDocCount: 1
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
          series: []
        },
        trendOption: {
          series: {
            type: 'line'
          }
        },
        mapOption: {},
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
  }
  componentWillMount() {
    this.init();
  }
  componentDidMount() {
    Promise.all([
      this.$api.home.mapChart.request({ eventsId: this.$store.state.user.eventsId }),
      this.$api.home.evaluation.request({ eventsId: this.$store.state.user.eventsId }),
      this.$api.home.trendChart.request({ eventsId: this.$store.state.user.eventsId }),
      this.$api.home.starChart.request({ eventsId: this.$store.state.user.eventsId })]
    ).then((res) => {
      this.map(res[0]);
      this.radar(res[1]);
      this.line(res[2]);
      this.compare(res[3]);
    });
  }
  init = () => {
    let name = '';
    let areaType = 0;
    let judge = [];
    let cases = [];
    let judges = [];
    Promise.all([
      this.$api.home.judges.request({ eventsId: this.$store.state.user.eventsId }),
      this.$api.home.judgeRecommend.request({ eventsId: this.$store.state.user.eventsId })
    ]).then((res) => {
      const result = res[0].data;
      if (result.code === 0) {
        name = result.data.province.name;
        areaType = result.data.areaType;
        if (name === '上海' || name === '重庆' || name === '天津' || name === '北京') {
          areaType = 4;
        }
        if (result.data.city) {
          name = result.data.city.name;
        }
        if (result.data.town) {
          name = result.data.town.name;
        }
        cases = result.data.caseTotal;
        judge = result.data.judgeTotal;
      }
      if (res[1].data.code === 0) {
        judges = res[1].data.data;
      }
      const data = this.state.data;
      const location = this.state.location;
      const amount = this.state.amount;
      Object.assign(data, { judges });
      Object.assign(location, { name, areaType });
      Object.assign(amount, { judge, cases });
      this.setState({
        data,
        location,
        amount
      });
    });
  };
  // 判断是否为小数
  checkNum = (num) => {
    const str = String(num);
    return (str.indexOf('.') !== -1);
  };

  // 首页雷达图
  radar = (res) => {
    const result = res.data;
    if (result.code === 0) {
      const comment = {
        avgWorkload: this.checkNum(result.data.avgWorkload)
          ? result.data.avgWorkload.toFixed(2)
          : result.data.avgWorkload,
        avgDocCount: this.checkNum(result.data.avgDocCount)
          ? result.data.avgDocCount.toFixed(2)
          : result.data.avgDocCount,
        avgEsse: this.checkNum(result.data.avgEsse)
          ? result.data.avgEsse.toFixed(2)
          : result.data.avgEsse,
        avgOrder: this.checkNum(result.data.avgOrder)
          ? result.data.avgOrder.toFixed(2)
          : result.data.avgOrder,
        avgQua: parseInt((this.checkNum(result.data.avgEsse)
          ? result.data.avgEsse.toFixed(2)
          : result.data.avgEsse) * 100, 10) / 100
      };
      const radars = {
        maxAvgOrder: result.data.maxAvgOrder === 0
          ? 0 : Math.log(result.data.maxAvgOrder).toFixed(2),
        maxAvgEsse: result.data.maxAvgEsse === 0
          ? 0 : Math.log(result.data.maxAvgEsse).toFixed(2),
        maxWorkload: result.data.maxWorkload === 0
          ? 0 : Math.log(result.data.maxWorkload).toFixed(2),
        maxDocCount: result.data.maxDocCount === 0
          ? 0 : Math.log(result.data.maxDocCount).toFixed(2)
      };
      const data = this.state.data;
      Object.assign(data, { comment, radars });
      this.setState({
        data
      });
    }
    const abilityChartOption = {
      tooltip: {
        trigger: 'axis'
      },
      radar: [
        {
          indicator: [
            { text: '年均平均案件数量', max: this.state.data.radars.maxDocCount },
            { text: '平均程序权重', max: this.state.data.radars.maxAvgOrder },
            { text: '法官年均工作量', max: this.state.data.radars.maxWorkload },
            { text: '平均实体权重', max: this.state.data.radars.maxAvgEsse }
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
            formatter: (a) => {
              let str = `${a.name}<br/>` ;
              str += `平均办案数量:${this.state.data.comment.avgDocCount} 件<br/>`;
              str += `平均程序权重:${this.state.data.comment.avgOrder}<br/>`;
              str += `法官年均平均工作量:${this.state.data.comment.avgWorkload}<br/>`;
              str += `年均平均实体权重:${this.state.data.comment.avgEsse}`;
              return str;
            }
          },
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              value: [
                this.state.data.comment.avgDocCount === 0 ? 0
                  : Math.log(this.state.data.comment.avgDocCount).toFixed(2),
                this.state.data.comment.avgOrder === 0 ? 0
                  : Math.log(this.state.data.comment.avgOrder).toFixed(2),
                this.state.data.comment.avgWorkload === 0 ? 0
                  : Math.log(this.state.data.comment.avgWorkload).toFixed(2),
                this.state.data.comment.avgEsse === 0 ? 0
                  : Math.log(this.state.data.comment.avgEsse).toFixed(2)
              ],
              name: '综合能力'
            }
          ]
        }
      ]
    };
    const options = this.state.options;
    Object.assign(options, { abilityChartOption });
    this.setState({
      options
    });
  };

  // 首页折线图
  line = (res) => {
    const result = res.data;
    if (result.code === 0) {
      const line = {
        categories: result.data.categories.length === 0 ? [0] : result.data.categories,
        topDatas: result.data.topDatas.length === 0 ? [0] : result.data.topDatas,
        middleDatas: result.data.middleDatas.length === 0 ? [0] : result.data.middleDatas,
        bottomDatas: result.data.bottomDatas.length === 0 ? [0] : result.data.bottomDatas
      };
      const data = this.state.data;
      Object.assign(data, { line });
      this.setState({
        data
      });
      let areaCode = 3;
      if (result.data.areaType) {
        areaCode = result.data.areaType;
      }
      const seriesArr = [];
      const topData = this.state.data.line.topDatas;
      const middleData = this.state.data.line.middleDatas;
      const bottomData = this.state.data.line.bottomDatas;
      topData.forEach(item => (item.value = parseFloat(item.value).toFixed(2)));
      middleData.forEach(item => (item.value = parseFloat(item.value).toFixed(2)));
      bottomData.forEach(item => (item.value = parseFloat(item.value).toFixed(2)));
      let top = 0;
      while (top < topData.length && topData[top].value < 1) {
        top += 1;
      }
      let mid = 0;
      while (mid < middleData.length && middleData[mid].value < 1) {
        mid += 1;
      }
      let bot = 0;
      while (bot < bottomData.length && bottomData[bot].value < 1) {
        bot += 1;
      }
      let min = 0;
      if (areaCode === 1) {
        min = Math.min(top, mid, bot);
        seriesArr.push({
          name: '高级法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: topData.slice(min)
        }, {
          name: '中级法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: middleData.slice(min)
        }, {
          name: '基层法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: bottomData.slice(min)
        });
      } else if (areaCode === 2) {
        min = Math.min(mid, bot);
        seriesArr.push({
          name: '中级法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: middleData.slice(min)
        }, {
          name: '基层法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: bottomData.slice(min)
        });
      } else if (areaCode === 3) {
        min = bot;
        seriesArr.push({
          name: '基层法院',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: bottomData.slice(min)
        });
      }
      const trendOption = {
        tooltip: {
          trigger: 'axis'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.state.data.line.categories.slice(min)
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
        series: seriesArr
      };
      const options = this.state.options;
      Object.assign(options, { trendOption });
      this.setState({
        options
      });
    }
  };

  // 地图 区域资源配置
  map = (res) => {
    const result = res.data;
    if (result.code === 0) {
      const mapAvgCaseTotal = [];
      let mapJudgeTotal = {};
      if (result.data.areaType !== 3) {
        if (result.data.mapAvgCaseTotal.length !== 0) {
          for (let i = 0;i < result.data.mapAvgCaseTotal.length; i += 1) {
            mapAvgCaseTotal.push(
              {
                name: result.data.nameMap[result.data.mapAvgCaseTotal[i].name],
                value: result.data.mapAvgCaseTotal[i].value,
                key: result.data.mapAvgCaseTotal[i].key
              }
            );
          }
          mapJudgeTotal = result.data.mapJudgeTotal;
        }
      } else {
        mapAvgCaseTotal.push(
          {
            name: result.data.townName,
            value: result.data.avgCaseTotal,
            key: result.data.areaCode
          }
        );
        mapJudgeTotal[result.data.townName] = result.data.judgeTotal;
      }
      const map = {
        mapAvgCaseTotal,
        mapJudgeTotal,
        minData: result.data.minData,
        maxData: result.data.maxData,
        minCity: result.data.minCity,
        maxCity: result.data.maxCity,
        judgeTotal: result.data.judgeTotal,
        judgeDept: result.data.judgeDept,
        avgCaseTotal: result.data.avgCaseTotal,
        caseDept: result.data.caseDept,
        provinceName: result.data.provinceName,
        cityName: result.data.cityName,
        townName: result.data.townName
      };
      const location = this.state.location;
      if (result.data.areaType) {
        Object.assign(location, { areaType: result.data.areaType });
      }
      const data = this.state.data;
      Object.assign(data, { map });
      this.setState({
        data,
        location
      });
    }
    // 如果是城市的话需要自己注册一个地图，地图的json文件需要手动引入
    const mapType = [];
    let mapName = '';
    if (this.state.location.areaType === 1) {
      mapName = this.state.data.map.provinceName;
    } else if (this.state.location.areaType === 2) {
      mapType.push(this.state.data.map.cityName);
      if (this.state.data.map.cityName === '济南市') {
        mapName = 'jinan';
      } else if (this.state.data.map.cityName === '苏州市') {
        mapName = 'suzhou';
      } else if (this.state.data.map.cityName === '厦门市') {
        mapName = 'xiamen';
      } else if (this.state.data.map.cityName === '福州市') {
        mapName = 'fuzhou';
      }
    } else if (this.state.location.areaType === 3) {
      mapType.push(this.state.data.map.townName);
      if (this.state.data.map.townName === '思明区') {
        mapName = 'simingqu';
      } else if (this.state.data.map.townName === '虎丘区') {
        mapName = 'huqiuqu';
      }
    }
    // 地图的标题根据areaType动态决定
    const area = ['全省各市', '全市各区', '全区'];
    const $this = this;
    const mapOption = {
      title: {
        text: `近3年内${area[this.state.location.areaType - 1]}人均办案数量`,
        subtext: '单位：件'
      },
      tooltip: {
        trigger: 'item',
        formatter(a) {
          let str = `${a.name}<br/>`;
          str += `法官人数：${$this.state.data.map.mapJudgeTotal[a.name]}人<br/>`;
          str += `人均办案数：${a.value}件`;
          return str;
        }
      },
      series: [
        {
          name: '人均办案数量',
          type: 'map',
          map: mapName,
          selectedMode: 'single',
          itemStyle: {
            normal: { areaColor: '#ed8a19', label: { show: true, textStyle: { color: 'black', fontSize: '16px' } } },
            emphasis: { label: { show: true, textStyle: { color: 'black' } } }
          },
          data: this.state.data.map.mapAvgCaseTotal
        }
      ]
    };
    const dataRange = {
      min: this.state.data.map.minData,
      max: this.state.data.map.maxData,
      color: ['red', 'orangered', 'orange', 'yellow', 'lightgreen', 'lightblue'],
      text: ['高', '低'],
      calculable: true
    };
    if (this.state.location.areaType !== 3) {
      Object.assign(mapOption, { dataRange });
    }
    if (this.state.data.map.provinceName === '上海'
      || this.state.data.map.provinceName === '重庆'
      || this.state.data.map.provinceName === '天津'
      || this.state.data.map.provinceName === '北京') {
      this.state.location.areaType = 4;
    }
    const options = this.state.options;
    Object.assign(options, { mapOption });
    this.setState({
      options
    });
  };

  // 法官星级分布
  compare = (res) => {
    const result = res.data;
    if (result.code === 0) {
      const judgeOption = {
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
            data: [result.data.one, result.data.two, result.data.three, result.data.four, result.data.five]
          }
        ]
      };
      const options = this.state.options;
      Object.assign(options, { judgeOption });
      this.setState({
        options
      });
    }
  };
  render() {
    return (
      <div id="home">
        <Header />
        <div className="content">
          <div className="title_wrap">
            <Title location={this.state.location} amount={this.state.amount} />
          </div>
          <Options location={this.state.location} data={this.state.data} options={this.state.options} />
        </div>
      </div>
    );
  }
}
export default Home;
