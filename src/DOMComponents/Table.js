import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import { TableHeader, TableBody } from './TableRowContainer';
import {
  parseText,
  getClassNames,
} from './Utilities';
/**
 * Renders text.
 */
export default class Table extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, variables = {}) {
    const stack = [];
    let dataRows = [];
    let headerRows = [];
    let heights = [];
    let widths = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (typeof child === 'number') {
        stack.push(child.toString());
      } else if (typeof child === 'string') {
        stack.push(parseText(child, variables));
      } else if (child.ref) {
        if (child.ref instanceof TableHeader) {
          const header = child.ref.constructor.transform(child, variables);
          headerRows = [
            ...headerRows,
            header.rows,
          ];
          heights = [
            ...heights,
            header.height || '',
          ];
          widths = [
            ...widths,
            header.width || '*',
          ];
        } else if (child.ref instanceof TableBody) {
          const body = child.ref.constructor.transform(child, variables);
          dataRows = [
            ...dataRows,
            ...body.rows,
          ];

          heights = [
            ...heights,
            ...body.heights,
          ];
          widths = [
            ...widths,
            ...body.widths,
          ];
        }
      }
    }

    const classNames = getClassNames(DOM);

    return {
      table: {
        headerRows: headerRows.length,
        body: [
          ...headerRows,
          ...dataRows,
        ],
        widths,
        heights,
      },
      style: [...classNames, `_${DOM.elementName}`, DOM.elementName],
      ...DOM.props.style || {},
    };
  }
}
