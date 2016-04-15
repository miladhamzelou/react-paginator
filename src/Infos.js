import React, {Component, PropTypes} from 'react';
import {SIZE_PREFIXES} from './utils';

export default class Infos extends Component {
  static propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  };

  render() {
    const className = `pagination-infos pagination-infos-${SIZE_PREFIXES[this.props.size]}`;
    return (
      <div className={className}>
        {`${this.props.min}-${this.props.max} / ${this.props.total}`}
      </div>
    );
  }
}
