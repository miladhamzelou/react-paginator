import React from 'react';
import ReactDOM from 'react-dom';

import PureComponent from '../../src/PureComponent';
import Paginator from '../../src';
import Playground from './Playground';

const SIZES = ['small', 'medium', 'large'];

const ALL_SIZE_CODE = `<Paginator
  size="small"
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  total={200}
/>

<Paginator
  size="medium"
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  total={200}
/>

<Paginator
  size="large"
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  total={200}
/>
`;

const CONDENSED_CODE = `<Paginator
  condensed
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  total={200}
/>`;

const INFOS_CODE = `<Paginator
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  showInfos
  total={200}
/>`;

const DISABLED_CODE = `<Paginator
  disabled
  nbRowsPerPage={20}
  onPageChange={this.handlePageChange}
  page={this.state.page}
  total={200}
/>`;

class Example extends PureComponent {
  state = {page: 1};

  /**
   * Called when page change.
   *
   * @param {number} page
   */
  handlePageChange = page => {
    this.setState({page});
  };

  /**
   * Render paginators in all sizes.
   *
   * @param {object} [props={}]
   * @returns {ReactElement[]}
   */
  renderPaginators(props = {}, sizes = ['medium']) {
    return sizes.map(size => (
      <Paginator
        key={size}
        nbRowsPerPage={20}
        onPageChange={this.handlePageChange}
        page={this.state.page}
        size={size}
        total={200}
        {...props}
      />
    ));
  }

  render() {
    return (
      <div>
        <h3>All sizes</h3>
        <Playground code={ALL_SIZE_CODE}>
          {this.renderPaginators({}, SIZES)}
        </Playground>
        <h3>Condensed</h3>
        <Playground code={CONDENSED_CODE}>
          {this.renderPaginators({condensed: true})}
        </Playground>
        <h3>With informations</h3>
        <Playground code={INFOS_CODE}>
          {this.renderPaginators({showInfos: true})}
        </Playground>
        <h3>Disabled</h3>
        <Playground code={DISABLED_CODE}>
          {this.renderPaginators({disabled: true})}
        </Playground>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('example'));
