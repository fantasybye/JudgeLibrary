/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../constants/Component';
import '../less/commons/pagination.less';

class Pagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      emitter: null,
      current: 1,
      indexes: []
    };
  }
  componentDidMount() {
    this.setPagination(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setPagination(nextProps);
  }
  setPagination = (nextProps) => {
    let total = 10;
    if (document.body.clientWidth < 1280) {
      total = 6;
    }
    let left = 1;
    let right = nextProps.allPage;
    const indexes = [];
    if (nextProps.allPage >= total + 1) {
      if (nextProps.current > (total / 2) && nextProps.current < nextProps.allPage - (total / 2 - 1)) {
        left = nextProps.current - (total / 2);
        right = nextProps.current + (total / 2 - 1);
      } else if (nextProps.current <= (total / 2)) {
        left = 1;
        right = total;
      } else {
        right = nextProps.allPage;
        left = nextProps.allPage - (total - 1);
      }
    }
    while (left <= right) {
      indexes.push(left);
      left += 1;
    }
    this.setState({
      current: nextProps.current,
      indexes
    });
  };
  btnClick = (emitter, page) => {
    emitter.emit('changePage', page);
    this.setState({
      current: page
    });
  };
  render() {
    const { emitter, allCount, allPage } = this.props;
    const { indexes, current } = this.state;
    return (
      <div className="page-bar">
        <ul>
          <li><a className="option_before">共<i>{allCount}</i>条</a></li>
          {current !== 1 ? <li><a className="option_before" onClick={this.btnClick.bind(this, emitter, 1)}>第一页</a></li> : null}
          {current !== 1 ? <li><a className="option_before" onClick={this.btnClick.bind(this, emitter, current - 1)}>上一页</a></li> : null}
          {indexes.map((item, index) => {
            const list = [];
            list.push(<li key={index} className={current === item ? 'active' : ''}>
              <a onClick={this.btnClick.bind(this, emitter, index + 1)}>{item}</a>
            </li>);
            return list;
          })}
          {current !== allPage ? <li><a className="option_after" onClick={this.btnClick.bind(this, emitter, current + 1)}>下一页</a></li> : null}
          {current !== allPage ? <li><a className="option_after" onClick={this.btnClick.bind(this, emitter, allPage)}>最后一页</a></li> : null}
          <li><a className="option_after">共<i>{allPage}</i>页</a></li>
        </ul>
      </div>
    );
  }
}
// Pagination.propTypes = {
//   allPage: React.PropTypes.number.isRequired,
//   current: React.PropTypes.number.isRequired, // eslint-disable-line
//   emitter: React.PropTypes.any.isRequired,
//   allCount: React.PropTypes.number.isRequired
// };
export default Pagination;
