import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default React.createClass({
  displayName: 'PaginatorButton',

  propTypes: {
    active: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    page: PropTypes.number
  },

  getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  /**
   * Called when the user click on the link.
   *
   * @param {SyntheticEvent} event
   */

  onClick(event) {
    event.preventDefault();

    if (this.props.onPageChange)
      this.props.onPageChange(this.props.page);
  },

  render() {
    const className = classNames({
      disabled: this.props.disabled,
      active: this.props.active
    });

    return (
      <li className={className}>
        <a aria-label={this.props.ariaLabel || this.props.label} href="#" onClick={this.onClick}>
          <span aria-hidden="true">{this.props.label}</span>
        </a>
      </li>
    );
  }
});
