import {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class PureComponent extends Component {
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.call(this, ...args);
  }
}
