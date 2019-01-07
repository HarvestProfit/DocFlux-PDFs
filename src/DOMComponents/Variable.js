import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Renders text.
 */
export default class Variable extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, variables = {}) {
    switch (DOM.elementName) {
      case 'currentpage':
        return (variables.currentPage || '').toString();
      case 'totalpages':
        return (variables.pageCount || '').toString();
      default:
        return '';
    }
  }
}
