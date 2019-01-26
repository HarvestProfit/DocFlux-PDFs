import _ from 'lodash';
import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import { Header, Footer } from './HeaderFooter';
import {
  parseText,
  getClassNames,
} from './Utilities';
/**
 * Renders text.
 */
export default class TextNode extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, variables = {}) {
    let stack = [];
    let options = {};
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (typeof child === 'number') {
        stack.push(child.toString());
      } else if (typeof child === 'string') {
        stack.push(
          parseText(child, variables),
        );
      } else if (child.ref) {
        if (child.ref instanceof Header) {
          options = {
            ...options,
            header: child.ref.constructor.transform(child, variables),
          };
        }

        if (child.ref instanceof Footer) {
          options = {
            ...options,
            footer: child.ref.constructor.transform(child, variables),
          };
        }
        stack.push(child.ref.constructor.transform(child, variables));
      }
    }

    const classNames = getClassNames(DOM);

    let stackName = 'text';
    if (DOM.props.row) {
      stackName = 'columns';
    } else if (DOM.elementName === 'div') {
      stackName = 'stack';
    } else if (DOM.elementName === 'ul') {
      stackName = 'ul';
    } else if (DOM.elementName === 'ol') {
      stackName = 'ol';
    }

    if (stackName === 'text' && DOM.value.length === 1) {
      ([stack] = stack);
    }

    const style = {
      ...DOM.props.style || {},
      ..._.pick(DOM.props, ['colSpan']),
    };

    const value = {
      [stackName]: stack,
      style: [`_${DOM.elementName}`, DOM.elementName, ...classNames],
      ...style,
      ...options,
    };

    if (DOM.elementName === 'a' && DOM.props.href) {
      if (DOM.props.internal) {
        return {
          ...value,
          linkToPage: DOM.props.href,
        };
      }

      return {
        ...value,
        link: DOM.props.href,
      };
    }

    return value;
  }
}
