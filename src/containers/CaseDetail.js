/*
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import { Spin } from 'antd';
import Component from '../constants/Component';
import Header from '../commons/Header';
import Title from '../components/casedetail/title/Title';
import Menu from '../components/casedetail/title/Menu';
import Text from '../components/casedetail/content/Text';
import Info from '../components/casedetail/content/Info';
import '../less/casedetail/casedetail.less';

const EventEmitter = require('events').EventEmitter;

class CaseDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      caseInfo: {},
      laws: [],
      paraMap: {},
      paraTags: [],
      paraTagMap: {},
      noDivPara: true,
      edit: false,
      myData: []
    };
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.emitter.on('toAnchor', this.toAnchor.bind(this));
    this.emitter.on('changeOption', this.changeOption.bind(this));
    const url = document.location.href;
    if (url.indexOf('?') !== -1) {
      const search = window.location.hash.split('?')[1];
      const id = search ? search.split('&')[0].split('=')[1] : '';
      this.getData(id);
    }
  }
  getData = (id) => {
    this.$api.case.detail.request({ caseInfoId: id }).then(({ data }) => {
      if (data.code === 0) {
        const paraTagMap = data.data.paraTagMap || [];
        const caseInfo = data.data.caseInfo || [];
        const laws = data.data.laws || [];
        let noDivPara = true;
        let paraGroups = [];
        if (data.data.paraGroups) {
          noDivPara = false;
          paraGroups = data.data.paraGroups;
        }
        const paraMap = data.data.paraMap || [];
        const myData = Object.keys(data.data.paraMap);
        this.setState({
          loading: false,
          caseInfo,
          laws,
          noDivPara,
          paraGroups,
          paraMap,
          paraTagMap,
          myData
        });
      }
    });
  };
  changeOption = (myData) => {
    this.setState({
      myData
    });
  };
  toAnchor = (key) => {
    const element = document.getElementById(key);
    if (element) element.scrollIntoView();
  };
  render() {
    const { loading, caseInfo, paraMap, paraTagMap, laws, myData } = this.state;
    return (<div>
      <Header>
        <span className="detail-header">
          文书正文
        </span>
      </Header>
      {loading ? <div className="loading">
        <Spin size="large" />
      </div> : <div className="body">
        <div className="title_div">
          <Title caseInfo={caseInfo} />
          <Menu paraMap={paraMap} paraTagMap={paraTagMap} emitter={this.emitter} />
        </div>
        <div className="content_div">
          <Text
            laws={laws}
            paraMap={paraMap}
            paraTagMap={paraTagMap}
            myData={myData}
            emitter={this.emitter}
          />
          <Info caseInfo={caseInfo} />
        </div>
      </div>}
    </div>);
  }
}
export default CaseDetail;
