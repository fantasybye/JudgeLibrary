/**
 * Created by frank on 2017/7/11.
 */
import React from 'react';
import Component from '../../constants/Component';
import Search from './Search';
import '../../less/home/title.less';

class Title extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location: {},
      amount: {
        judge: [],
        cases: []
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      location: nextProps.location,
      amount: nextProps.amount
    });
  }
  render() {
    const { location, amount } = this.state;
    const dict = (() => {
      if (location.areaType === 1) {
        return <span >省</span>;
      } else if (location.areaType === 3) {
        return <span >区</span>;
      }
      return <span >市</span>;
    })();
    return (
      <div className="title">
        <div className="top">
          {(() => {
            if (location.areaType === 1) {
              return <span >{location.name}省</span>;
            } else if (location.areaType === 4) {
              return <span >{location.name}市</span>;
            }
            return <span >{location.name}</span>;
          })()}
          <img alt="" src={require('../../assets/home/title/logo.png')} /><div>法官审务库</div>
        </div>
        <div className="search_div">
          <Search />
          <div className="total_div clearfix">
            <div className="message">已收录全{dict}法官总数</div>
            <span>
              {amount.judge.length === 0
                ? <div className="total">0</div>
                : amount.judge.map((x, i) => <div key={i} className="total">{x}</div>)}
            </span>
            <div className="message util">人</div>
            <div className="message">
              全{dict}案件总数
            </div>
            <span>
              {amount.cases.length === 0
                ? <div className="total">0</div>
                : amount.cases.map((x, i) => <div key={i} className="total">{x}</div>)}
            </span>
            <div className="message util">件</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Title;
