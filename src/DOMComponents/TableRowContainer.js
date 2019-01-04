import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Renders text.
 */
export default class TableRowContainer extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM) {
    const rows = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        rows.push(child.ref.constructor.transform(child));
        if (['td', 'th'].indexOf(child.elementName) >= 0 && child.props.colSpan) {
          for (let col = 1; col < child.props.colSpan; col += 1) {
            rows.push('');
          }
        }
      }
    }

    return rows;
  }
}

export class TableHeader extends TableRowContainer {}
export class TableBody extends TableRowContainer {}
