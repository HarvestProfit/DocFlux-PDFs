import { DOMComponent } from '@harvest-profit/doc-flux';
import PropTypes from 'prop-types';
import {
  parseText,
  getClassNames,
  pick,
} from './Utilities';
/**
 * Renders a page break in the PDF
 */
export default class HeaderFooter extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, variables = {}) {
    return (currentPage, pageCount) => {
      if (DOM.props.excludePage && DOM.props.excludePage === currentPage) return {};
      if (DOM.props.includePage && DOM.props.includePage !== currentPage) return {};
      const stack = [];
      for (let i = 0; i < DOM.value.length; i += 1) {
        const child = DOM.value[i];
        if (typeof child === 'number') {
          stack.push(child.toString());
        } else if (typeof child === 'string') {
          stack.push(
            parseText(child, variables),
          );
        } else if (child.ref) {
          if (child.props.excludePage && child.props.excludePage === currentPage) continue;
          if (child.props.includePage && child.props.includePage !== currentPage) continue;
          stack.push(child.ref.constructor.transform(child, {
            ...variables, currentPage, pageCount,
          }));
        }
      }

      const classNames = getClassNames(DOM);

      let stackName = 'stack';
      if (DOM.props.row) {
        stackName = 'columns';
      }

      const style = {
        ...DOM.props.style || {},
        ...pick(DOM.props, []),
      };

      return {
        [stackName]: stack,
        style: [`_${DOM.elementName}`, DOM.elementName, ...classNames],
        ...style,
      };
    };
  }
}

export class Header extends HeaderFooter {}
export class Footer extends HeaderFooter {}
