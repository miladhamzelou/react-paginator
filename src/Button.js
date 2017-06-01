/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Button extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    page: PropTypes.number,
  }

  static defaultProps = {
    active: false,
    disabled: false,
  }

  /**
   * Called when the user click on the link.
   *
   * @param {SyntheticEvent} event
   */
  handleClick = (event) => {
    event.preventDefault()
    if (this.props.onPageChange) this.props.onPageChange(this.props.page)
  }

  render() {
    return (
      <li
        className={classNames({
          disabled: this.props.disabled,
          active: this.props.active,
        })}
      >
        <a aria-label={this.props.ariaLabel || this.props.label} href="#" onClick={this.handleClick}>
          <span aria-hidden="true">{this.props.label}</span>
        </a>
      </li>
    )
  }
}
