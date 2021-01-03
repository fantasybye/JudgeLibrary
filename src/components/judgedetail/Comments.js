/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';

class Comments extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (<div>
      <div className="comments detail">
        <div className="title">
          <div>
            <img alt="" src={require('../../assets/judgedetail/comments/icon_comment.png')} /><span>评价</span>
          </div>
          <img alt="" src={require('../../assets/judgedetail/line_thin.png')} />
        </div>
        <ul className="appraises">
          <li className="appraise" v-if="!judge_comment">
            <div className="no_comment">暂无评价内容</div>
          </li>
          <li className="appraise" v-for="item in judge_comment" v-if="judge_comment">
            <div className="portrait"><img alt="" src={require('../../assets/sex/man.png')} /></div>
            <div className="name_div"><span className="name" v-if="item.name">item.name</span><span className="comment_time">{new Date().Format('yyyy-MM-dd')}</span></div>
            <div className="comment">item.context</div>
          </li>
        </ul>
      </div>
      {/* 添加评价*/}
      <div className="add_comment">
        <div className="title">
          <div><span>添加评价</span></div>
        </div>
        <div className="input">
          <textarea id="add_comment" rows="5" v-model="comment" />
          <input id="confirm_add_comment" type="button" value="评价" onClick="show_confirm()" />
        </div>
      </div>
    </div>);
  }
}
export default Comments;
