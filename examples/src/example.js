import React from 'react';
import ReactDOM from 'react-dom';

import Paginator from '../../src';

const SIZES = ['small', 'medium', 'large'];

const Example = React.createClass({
  displayName: 'Example',

  getInitialState() {
    return {page: 1};
  },

  /**
   * Called when page change.
   *
   * @param {number} page
   */
  onPageChange(page) {
    this.setState({page});
  },

  /**
   * Render paginators in all sizes.
   *
   * @param {object} [props={}]
   * @returns {ReactElement[]}
   */
  renderPaginators(props = {}) {
    return SIZES.map(size => (
      <Paginator
        key={size}
        nbRowsPerPage={20}
        onPageChange={this.onPageChange}
        page={this.state.page}
        size={size}
        total={200}
        {...props}
      />
    ));
  },

  render() {
    return (
      <div>
        <h3>Basic</h3>
        {this.renderPaginators()}
        <h3>Condensed</h3>
        {this.renderPaginators({condensed: true})}
        <h3>With informations</h3>
        {this.renderPaginators({showInfos: true})}
        <h3>Disabled</h3>
        {this.renderPaginators({disabled: true})}
      </div>
    );
  }
});

ReactDOM.render(<Example/>, document.getElementById('example'));
