import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import { TableHeader, TableBody } from './TableRowContainer';

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

  static transform(DOM) {
    const stack = [];
    let dataRows = [];
    let headerRows = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (typeof child === 'number') {
        stack.push(child.toString());
      } else if (typeof child === 'string') {
        stack.push(child);
      } else if (child.ref) {
        if (child.ref instanceof TableHeader) {
          headerRows = [
            ...headerRows,
            child.ref.constructor.transform(child),
          ];
        } else if (child.ref instanceof TableBody) {
          dataRows = [
            ...dataRows,
            ...child.ref.constructor.transform(child),
          ];
        }
      }
    }

    let classNames = [];
    if ((DOM.props.className || '').trim().length > 0) {
      classNames = (DOM.props.className || '').split(/\s./).map(className => `.${className}`);
    }

    return {
      table: {
        headerRows: headerRows.length,
        body: [
          ...headerRows,
          ...dataRows,
        ],
      },
      style: [...classNames, DOM.elementName],
      ...DOM.props.style || {},
    };
  }
}
