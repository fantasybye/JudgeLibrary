/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../constants/Component';
import TimeSelector from '../../commons/TimeSelector';
import '../../less/comment/star.less';

const EventEmitter = require('events').EventEmitter;

class Star extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.emitter = new EventEmitter();
  }
  componentWillMount() {
    this.emitter.on('changeTime', this.changeTime.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      emitter: nextProps.emitter
    });
  }
  // 改变时间刷新法官对比页面
  changeTime =({ startTime, endTime, quickTime }) => {
    const form = this.$store.state.commentForm;
    Object.assign(form, { startTime, endTime, quickTime });
    this.$store.state.commentForm = form;
    this.props.emitter.emit('loading');
    this.$api.judge.star.request(this.$store.state.commentForm).then((result) => {
      this.props.emitter.emit('done', result.data.data);
    });
  };
  render() {
    const { starData, showDate } = this.props;
    return (<div className="options_div">
      <div className="judge_name">
        <div className="name">{starData.judge ? starData.judge.name : ''}</div>
        {starData.judge ? <div className="star">
          {(() => {
            const imgs = [];
            for (let i = 0; i < starData.judge.starGrade; i += 1) {
              imgs.push(<img key={i} alt="" src={require('../../assets/judge/star_yellow.png')} />);
            }
            return imgs;
          })()}
          {(() => {
            const imgs = [];
            for (let i = 0; i < (5 - starData.judge.starGrade) || 0; i += 1) {
              imgs.push(<img key={i} alt="" src={require('../../assets/judge/star_gray.png')} />);
            }
            return imgs;
          })()}
        </div> : null}
        <TimeSelector show={showDate} emitter={this.emitter} />
      </div>
    </div>);
  }
}
// Star.propTypes = {
//   starData: React.PropTypes.object.isRequired,
//   showDate: React.PropTypes.bool
//   emitter
// };
export default Star;
