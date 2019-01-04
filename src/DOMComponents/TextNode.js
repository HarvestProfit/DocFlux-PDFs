import _ from 'lodash';
import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

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

  static transform(DOM) {
    const stack = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (typeof child === 'number') {
        stack.push(child.toString());
      } else if (typeof child === 'string') {
        stack.push(child);
      } else if (child.ref) {
        stack.push(child.ref.constructor.transform(child));
      }
    }

    let classNames = [];
    if ((DOM.props.className || '').trim().length > 0) {
      classNames = (DOM.props.className || '').split(/\s./).map(className => `.${className}`);
    }

    let stackName = 'stack';
    if (DOM.props.row) {
      stackName = 'columns';
    }

    const style = {
      ...DOM.props.style || {},
      ..._.pick(DOM.props, ['colSpan']),
    };

    return {
      [stackName]: stack,
      style: [...classNames, DOM.elementName],
      ...style,
    };
  }
}
