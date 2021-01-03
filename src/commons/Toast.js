/**
 * Created by frank on 2017/7/17.
 */
import React from 'react';
import Component from '../constants/Component';

const animationDuration = 1000; // ms
/* Colors */
const colorWhite = 'white';
const colorError = '#E85742';
const colorSuccess = '#55CA92';
const colorWarning = '#F5E273';
const textColorWarning = '#333333';
class Toast extends Component {
  static defaultProps = {
    color: 'white'
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: '',
      color: {},
      timeout: 1000,
      emitter: '',
      styles: {
        styleParent: {},
        content: {},
        container: {}
      }
    };
  }
  componentDidMount() {
    const { type, color, timeout, emitter } = this.props;
    this.getStyles(type, color);
    this.getVisibleState(timeout, emitter);
  }
  getStyles = (type, color) => {
    const styles = this.state.styles;
    const containerStyle = {
      fontSize: '2.4rem',
      position: 'fixed',
      width: '50%',
      margin: '0 auto',
      right: '0px',
      left: '0px',
      textAlign: 'center',
      zIndex: '999',
      pointerEvents: 'none',
      transition: `all ${animationDuration} ms ease`,
      transform: 'translateY(0px)'
    };
    const contentStyle = {
      cursor: 'pointer',
      display: 'inline',
      width: 'auto',
      borderRadius: '0 0 4px 4px',
      backgroundColor: 'white',
      padding: '1.6rem 3rem',
      pointerEvents: 'all'
    };
    /* If type is set, merge toast action styles with base */
    switch (type) {
    case 'success': {
      const successStyle = {
        backgroundColor: colorSuccess,
        color: colorWhite
      };
      Object.assign(styles, { content: Object.assign({}, contentStyle, successStyle) });
      break;
    }
    case 'error': {
      const errorStyle = {
        backgroundColor: colorError,
        color: colorWhite
      };
      Object.assign(styles, { content: Object.assign({}, contentStyle, errorStyle) });
      break;
    }
    case 'warning': {
      const warningStyle = {
        backgroundColor: colorWarning,
        color: textColorWarning
      };
      Object.assign(styles, { content: Object.assign({}, contentStyle, warningStyle) });
      break;
    }
    case 'custom': {
      const customStyle = {
        backgroundColor: color.background,
        color: color.text
      };
      Object.assign(styles, { content: Object.assign({}, contentStyle, customStyle) });
      break;
    }
    default:
      Object.assign(styles, { content: Object.assign({}, contentStyle) });
      break;
    }
    Object.assign(styles, { container: containerStyle });
    Object.assign(styles, { styleParent: containerStyle });
    this.setState({
      styles
    });
  };
  getVisibleState = (timeout, emitter) => {
    const styles = this.state.styles;
    const base = this.state.styles.container;
    // Show
    const stylesShow = {
      transform: 'translateY(108px)',
      msTransform: 'translateY(108px)',
      WebkitTransform: 'translateY(108px)',
      OTransform: 'translateY(108px)',
      MozTransform: 'translateY(108px)'
    };

    setTimeout(() => {
      Object.assign(styles, { styleParent: Object.assign({}, base, stylesShow) });
    }, 100); // wait 100ms after the component is called to animate toast.

    if (timeout === -1) {
      return;
    }

    // Hide after timeout
    const stylesHide = {
      transform: 'translateY(-108px)',
      msTransform: 'translateY(-108px)',
      WebkitTransform: 'translateY(-108px)',
      OTransform: 'translateY(-108px)',
      MozTransform: 'translateY(-108px)'
    };

    setTimeout(() => {
      Object.assign(styles, { styleParent: Object.assign({}, base, stylesHide) });
      emitter.emit('clear');
    }, timeout);
    this.setState({
      styles
    });
  };
  render() {
    const { text } = this.props;
    return (
      <div className="toast-notification" style={this.state.styles.styleParent}>
        <span className="type" style={this.state.styles.content}>{text}</span>
      </div>
    );
  }
}
// Toast.propTypes = {
//   color: React.PropTypes.object,
//   text: React.PropTypes.string.isRequired,
//   timeout: React.PropTypes.number.isRequired,
//   type: React.PropTypes.string.isRequired,
//   emitter: React.PropTypes.any.isRequired
// };
export default Toast;
