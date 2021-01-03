/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../../../constants/Component';
import '../../../less/casedetail/content/text.less';

class Text extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      edit: false
    };
  }
  changeAnchor = (index, e) => {
    const value = e.target.value;
    const myData = this.props.myData;
    myData[index] = value;
    this.props.emitter.emit('changeOption', myData);
  };
  render() {
    const { edit } = this.state;
    const { laws, paraMap, paraTagMap, myData } = this.props;
    return (<div className="text_div">
      {/* 法条*/}
      <div className="law_title clearfix">
        <img alt="" src={require('../../../assets/casedetail/icon_provision.png')} />
        <div>引用法规</div>
      </div>
      <div className="law_div">
        <div id="law-referenced">
          {/* 法策使用*/}
          {laws.map((law, index) => {
            const list = [];
            list.push(<li
              key={index}
              className="clearfix"
            >
              <label>
                <input
                  type="radio"
                  name="law"
                  value={law.id}
                />
              </label>
              <a>{law.name + law.item}</a>
              <div>
                <div>
                  <span className="title">{law.name + law.item}</span>
                  <span className="content">{law.content}</span>
                </div>
              </div>
            </li>);
            return list;
          })}

        </div>
      </div>
      {/* 文书正文*/}
      <div className="essay_title clearfix">
        <img alt="" src={require('../../../assets/casedetail/icon_article.png')} />
        <div>文书正文</div>
        <a onClick={() => { this.setState({ edit: !edit }); }}>编辑</a>
      </div>
      <div className="essay_div">
        {/* 加载前*/}
        <ul>
          {Object.entries(paraMap).map((item, index) => {
            const list = [];
            list.push(<li key={index}>
              {item[0] !== 'basic' && edit ? <div className="option">
                <select
                  id="anchor"
                  name="anchor"
                  value={myData[index]}
                  onChange={this.changeAnchor.bind(this, index)}
                >
                  {Object.entries(paraMap).map((option, index2) => {
                    const options = [];
                    options.push(<option
                      key={index2}
                      value={option[0]}
                    >{paraTagMap[option[0]].zhName}</option>);
                    return options;
                  })}
                </select>
              </div> : null}
              {item[0] !== 'basic' && !edit ? <div className="para_title">
                <div
                  id={paraTagMap[item[0]].id}
                  className="title"
                >{paraTagMap[item[0]].zhName}</div>
              </div> : null}
              {item[1].map((i, j) => {
                const paras = [];
                paras.push(<p
                  className="para"
                  key={j}
                  dangerouslySetInnerHTML={{ __html: i.content }}
                />);
                return paras;
              })}
              <div className="separator" />
            </li>);
            return list;
          })}
        </ul>
      </div>
    </div>);
  }
}
// Text.propTypes = {
//   laws: React.PropTypes.array.isRequired,
//   paraMap: React.PropTypes.object.isRequired,
//   paraTagMap: React.PropTypes.object.isRequired,
//   myData: React.PropTypes.array.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Text;
