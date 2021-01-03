/*
 * Created by frank on 2017/7/26.
 */
import React from 'react';
import Component from '../constants/Component';
import Header from '../commons/Header';

class WeightEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (<div>
      <Header>
        <span className="detail-header">
        规则配置面板
        </span>
      </Header>
      其他的内容由于暂时未确定如何修改指标权重，所以先搁置
    </div>);
  }
}
export default WeightEditor;
