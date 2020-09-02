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
    let widths = {};
    let colCount = 0;
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
            header.height || 'auto',
          ];
          widths = {
            ...widths,
            ...header.widths,
          };

          if (header.colCount > colCount) {
            ({ colCount } = header);
          }
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

          widths = {
            ...widths,
            ...body.widths,
          };

          if (body.colCount > colCount) {
            ({ colCount } = body);
          }
        }
      }
    }

    const classNames = getClassNames(DOM);

    const finalWidths = [];
    for (let i = 0; i < colCount; i += 1) {
      finalWidths.push(widths[i] || '*');
    }

    return {
      table: {
        headerRows: headerRows.length,
        body: [
          ...headerRows,
          ...dataRows,
        ],
        widths: finalWidths,
        heights,
      },
      style: [`_${DOM.elementName}`, DOM.elementName, ...classNames],
      layout: DOM.props.layout || 'default',
      ...DOM.props.style || {},
    };
  }
}
