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
    const widths = {};
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        cells.push(child.ref.constructor.transform(child, variables));
        if (child.props.width) widths[i] = child.props.width;
      }
    }

    return {
      rows: cells,
      height: DOM.props.height || 'auto',
      widths,
    };
  }
}

export class TableHeader extends TableRowContainer {
  static transform(DOM, variables = {}) {
    const cells = [];
    const widths = {};
    let colCount = 0;
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        cells.push(child.ref.constructor.transform(child, variables));
        if (child.props.width) widths[i] = child.props.width;
        if (child.props.colSpan) {
          for (let col = 1; col < child.props.colSpan; col += 1) {
            cells.push('');
          }
        }
      }

      if (cells.length > colCount) {
        colCount = cells.length;
      }
    }

    return {
      rows: cells,
      height: DOM.props.height,
      widths,
      colCount,
    };
  }
}
export class TableBody extends TableRowContainer {
  static transform(DOM, variables = {}) {
    const rows = [];
    const heights = [];
    let widths = {};
    let colCount = 0;
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        const row = child.ref.constructor.transform(child, variables);
        rows.push(row.rows);
        heights.push(row.height || 'auto');
        widths = {
          ...widths,
          ...row.widths,
        };

        if (row.rows.length > colCount) {
          colCount = row.rows.length;
        }
      }
    }

    return {
      rows,
      heights,
      widths,
      colCount,
    };
  }
}
