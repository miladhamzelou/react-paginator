import React, {Component, PropTypes} from 'react';
import range from 'lodash.range';

import Button from './Button';
import Infos from './Infos';
import {SIZE_PREFIXES} from './utils';

export default class Paginator extends Component {
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
    total: PropTypes.number.isRequired
  };

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
    showInfos: false
  };

  /**
   * Called when page change.
   *
   * @param {number} page
   */
  handlePageChange = page => {
    if (page >= 1 && page <= this.getNbPages() && !this.props.disabled)
      this.props.onPageChange(page);
  };

  /**
   * Get number of pages.
   *
   * @returns {number}
   */
  getNbPages() {
    const nbPages = Math.ceil(this.props.total / this.props.nbRowsPerPage);
    return nbPages <= 0 ? 1 : nbPages;
  }

  /**
   * Get min range.
   *
   * @returns {number}
   */
  getMinRange() {
    return (Math.ceil(this.props.page / this.props.pageRange) - 1) * this.props.pageRange + 1;
  }

  /**
   * Get max range.
   *
   * @returns {number}
   */
  getMaxRange() {
    const max = this.getMinRange() + this.props.pageRange - 1;
    return max < this.getNbPages() ? max : this.getNbPages();
  }

  /**
   * Render informations.
   *
   * @returns {ReactElement}
   */

  renderInfos() {
    if (!this.props.showInfos)
      return null;

    return (
      <Infos
        max={this.props.page * this.props.nbRowsPerPage}
        min={(this.props.page - 1) * this.props.nbRowsPerPage + 1}
        size={this.props.size}
        total={this.props.total}
      />
    );
  }

  /**
   * Render pages.
   *
   * @returns {ReactElement[]}
   */
  renderPages() {
    if (this.props.disabled)
      return <Button disabled label={this.props.breakLabel} />;

    return range(this.getMinRange(), this.getMaxRange() + 1)
      .map(this.renderPage);
  }

  /**
   * Render page.
   *
   * @param {number} page
   * @param {number} index
   * @returns {ReactElement}
   */
  renderPage = (page, index) => {
    return (
      <Button
        active={this.props.page === page}
        key={index}
        label={String(page)}
        onPageChange={this.handlePageChange}
        page={page}
      />
    );
  };

  /**
   * Render previous button.
   *
   * @returns {ReactElement}
   */
  renderPrevious() {
    return this.renderNeighbour({
      ariaLabel: this.props.previousAriaLabel,
      disabled: this.props.page === 1,
      label: this.props.previousLabel,
      page: this.props.page - 1
    });
  }

  /**
   * Render next button.
   *
   * @returns {ReactElement}
   */
  renderNext() {
    return this.renderNeighbour({
      ariaLabel: this.props.nextAriaLabel,
      disabled: this.props.page === this.getNbPages(),
      label: this.props.nextLabel,
      page: this.props.page + 1
    });
  }

  /**
   * Render neighbour.
   *
   * @param {object} options
   * @param {string} options.ariaLabel
   * @param {boolean} options.disabled
   * @param {string} options.label
   * @param {number} options.page
   * @returns {ReactElement}
   */
  renderNeighbour({ariaLabel, disabled, label, page}) {
    return (
      <Button
        ariaLabel={ariaLabel}
        disabled={disabled || this.props.disabled}
        label={label}
        onPageChange={this.handlePageChange}
        page={page}
      />
    );
  }

  /**
   * Render the last buttton.
   *
   * @returns {ReactElement}
   */
  renderFirst() {
    return this.renderBoundary({
      ariaLabel: this.props.firstAriaLabel,
      label: this.props.firstLabel,
      page: 1
    });
  }

  /**
   * Render the last buttton.
   *
   * @returns {ReactElement}
   */
  renderLast() {
    return this.renderBoundary({
      ariaLabel: this.props.lastAriaLabel,
      label: this.props.lastLabel,
      page: this.getNbPages()
    });
  }

  /**
   * Render boundary.
   *
   * @param {object} options
   * @param {string} options.ariaLabel
   * @param {string} options.label
   * @param {number} options.page
   * @returns {ReactElement}
   */
  renderBoundary({ariaLabel, label, page}) {
    return (
      <Button
        ariaLabel={ariaLabel}
        disabled={this.props.disabled || this.props.page === page}
        label={label}
        onPageChange={this.handlePageChange}
        page={page}
      />
    );
  }

  /**
   * Render previous break.
   *
   * @returns {ReactElement}
   */
  renderPreviousBreak() {
    return this.renderBreak(this.getMinRange() - 1);
  }

  /**
   * Render next break.
   *
   * @returns {ReactElement}
   */
  renderNextBreak() {
    return this.renderBreak(this.getMaxRange() + 1);
  }

  /**
   * Render break.
   *
   * @param {number} page
   * @returns {ReactElement}
   */
  renderBreak(page) {
    if (this.props.disabled || page >= this.getNbPages() || page <= 0)
      return null;

    return (
      <Button
        label={this.props.breakLabel}
        onPageChange={this.handlePageChange}
        page={page}
      />
    );
  }

  render() {
    const sizePrefix = SIZE_PREFIXES[this.props.size];
    const className = `pagination pagination-${sizePrefix}`;

    if (this.props.condensed)
      return (
        <div className={this.props.className}>
          {this.renderInfos()}
          <ul className={className}>
            {this.renderPrevious()}
            {this.renderNext()}
          </ul>
        </div>
      );

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
    );
  }
}
