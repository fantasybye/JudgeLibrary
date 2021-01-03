/**
 * Created by frank on 2017/7/18.
 */
import React from 'react';
import Component from '../constants/Component';
import '../less/commons/crumb.less';

class Crumb extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { text, emitter, index, form, list } = this.props;
    return (
      <div className="crumb">
        <span className="option_name">{text}</span>
        <span
          className="delete c-p"
          onClick={() => {
            emitter.emit('changeConditions', index, form, list);
          }}
        >
          <i className="icon icon-remove" />
        </span>
      </div>);
  }
}
// Crumb.propTypes = {
//   text: React.PropTypes.string.isRequired,
//   emitter: React.PropTypes.any.isRequired,
//   index: React.PropTypes.number.isRequired,
//   form: React.PropTypes.string.isRequired,
//   list: React.PropTypes.string.isRequired
// };
export default Crumb;
