import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash.range'
import Button from './Button'
import Infos from './Infos'
import { SIZE_PREFIXES } from './utils'

export default class Paginator extends React.PureComponent {
  static propTypes = {
    breakLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    condensed: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    firstAriaLabel: PropTypes.string.isRequired,
    firstLabel: PropTypes.string.isRequired,
    lastAriaLabel: PropTypes.string.isRequired,
    lastLabel: PropTypes.string.isRequired,
    nbRowsPerPage: PropTypes.number.isRequired,
    nextAriaLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pageRange: PropTypes.number.isRequired,
    previousAriaLabel: PropTypes.string.isRequired,
    previousLabel: PropTypes.string.isRequired,
    showInfos: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['large', 'medium', 'small']).isRequired,
    total: PropTypes.number.isRequired,
  }

  static defaultProps = {
    breakLabel: '…',
    condensed: false,
    disabled: false,
    firstAriaLabel: 'First',
    firstLabel: '«',
    lastAriaLabel: 'Last',
    lastLabel: '»',
    onPageChange: () => {},
    nextAriaLabel: 'Next',
    nextLabel: '›',
    pageRange: 3,
    previousAriaLabel: 'Previous',
    previousLabel: '‹',
    size: 'medium',
    showInfos: false,
  }

  handlePageChange = (page) => {
    if (page >= 1 && page <= this.getNbPages() && !this.props.disabled) this.props.onPageChange(page)
  }

  getNbPages() {
    const nbPages = Math.ceil(this.props.total / this.props.nbRowsPerPage)
    return nbPages <= 0 ? 1 : nbPages
  }

  getMinRange() {
    return (Math.ceil(this.props.page / this.props.pageRange) - 1) * this.props.pageRange + 1
  }

  getMaxRange() {
    const max = this.getMinRange() + this.props.pageRange - 1
    return max < this.getNbPages() ? max : this.getNbPages()
  }

  renderInfos() {
    if (!this.props.showInfos) return null

    return (
      <Infos
        max={this.props.page * this.props.nbRowsPerPage}
        min={(this.props.page - 1) * this.props.nbRowsPerPage + 1}
        size={this.props.size}
        total={this.props.total}
      />
    )
  }

  renderPages() {
    if (this.props.disabled) return <Button disabled label={this.props.breakLabel} />

    return range(this.getMinRange(), this.getMaxRange() + 1).map(this.renderPage)
  }

  renderPage = (page, index) => (
    <Button
      active={this.props.page === page}
      key={index}
      label={String(page)}
      onPageChange={this.handlePageChange}
      page={page}
    />
  )

  renderPrevious() {
    return this.renderNeighbour({
      ariaLabel: this.props.previousAriaLabel,
      disabled: this.props.page === 1,
      label: this.props.previousLabel,
      page: this.props.page - 1,
    })
  }

  renderNext() {
    return this.renderNeighbour({
      ariaLabel: this.props.nextAriaLabel,
      disabled: this.props.page === this.getNbPages(),
      label: this.props.nextLabel,
      page: this.props.page + 1,
    })
  }

  renderNeighbour({ ariaLabel, disabled, label, page }) {
    return (
      <Button
        ariaLabel={ariaLabel}
        disabled={disabled || this.props.disabled}
        label={label}
        onPageChange={this.handlePageChange}
        page={page}
      />
    )
  }

  renderFirst() {
    return this.renderBoundary({
      ariaLabel: this.props.firstAriaLabel,
      label: this.props.firstLabel,
      page: 1,
    })
  }

  renderLast() {
    return this.renderBoundary({
      ariaLabel: this.props.lastAriaLabel,
      label: this.props.lastLabel,
      page: this.getNbPages(),
    })
  }

  renderBoundary({ ariaLabel, label, page }) {
    return (
      <Button
        ariaLabel={ariaLabel}
        disabled={this.props.disabled || this.props.page === page}
        label={label}
        onPageChange={this.handlePageChange}
        page={page}
      />
    )
  }

  renderPreviousBreak() {
    return this.renderBreak(this.getMinRange() - 1)
  }

  renderNextBreak() {
    return this.renderBreak(this.getMaxRange() + 1)
  }

  renderBreak(page) {
    if (this.props.disabled || page >= this.getNbPages() || page <= 0) return null

    return <Button label={this.props.breakLabel} onPageChange={this.handlePageChange} page={page} />
  }

  render() {
    const sizePrefix = SIZE_PREFIXES[this.props.size]
    const className = `pagination pagination-${sizePrefix}`

    if (this.props.condensed) {
      return (
        <div className={this.props.className}>
          {this.renderInfos()}
          <ul className={className}>
            {this.renderPrevious()}
            {this.renderNext()}
          </ul>
        </div>
      )
    }

    return (
      <div className={this.props.className}>
        {this.renderInfos()}
        <ul className={className}>
          {this.renderFirst()}
          {this.renderPrevious()}
          {this.renderPreviousBreak()}
          {this.renderPages()}
          {this.renderNextBreak()}
          {this.renderNext()}
          {this.renderLast()}
        </ul>
      </div>
    )
  }
}
