import React, {PropTypes, Component} from 'react';
import {PrismCode} from 'react-prism';

export default class Playground extends Component {
  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string
  };

  state = {showCode: false};

  renderCodeToggle() {
    const className = `code-toggle ${this.state.showCode ? 'open' : ''}`;
    return this.props.code ? (
      <a
        className={className}
        onClick={this.handleClickCodeToggle}
        role="button"
      >
        {this.state.showCode ? 'hide code' : 'show code'}
      </a>
    ) : null;
  }

  handleClickCodeToggle = () => {
    this.setState({showCode: !this.state.showCode});
  };

  renderCode() {
    return this.state.showCode ? (
      <div className="code">
        <PrismCode className="language-javascript">{this.props.code}</PrismCode>
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="playground">
        <div className="example">{this.props.children}</div>
        {this.renderCode()}
        {this.renderCodeToggle()}
      </div>
    );
  }
}
