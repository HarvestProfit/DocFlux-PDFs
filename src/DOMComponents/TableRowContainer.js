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

  static transform(DOM, variables = {}) {
    const cells = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        cells.push(child.ref.constructor.transform(child, variables));
        if (['td', 'th'].indexOf(child.elementName) >= 0 && child.props.colSpan) {
          for (let col = 1; col < child.props.colSpan; col += 1) {
            cells.push('');
          }
        }
      }
    }

    return {
      rows: cells,
      height: DOM.props.height,
      width: DOM.props.width,
    };
  }
}

export class TableHeader extends TableRowContainer {}
export class TableBody extends TableRowContainer {
  static transform(DOM, variables = {}) {
    const rows = [];
    const heights = [];
    const widths = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        const row = child.ref.constructor.transform(child, variables);
        rows.push(row.rows);
        heights.push(row.height || '');
        widths.push(row.width || '*');
        if (['td', 'th'].indexOf(child.elementName) >= 0 && child.props.colSpan) {
          for (let col = 1; col < child.props.colSpan; col += 1) {
            rows.push('');
            heights.push('');
            widths.push('*');
          }
        }
      }
    }

    return {
      rows,
      heights,
      widths,
    };
  }
}
