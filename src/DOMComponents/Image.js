import { DOMComponent } from '@harvest-profit/doc-flux';
import {
  getClassNames,
} from './Utilities';
/**
 * Renders text.
 */
export default class Image extends DOMComponent {
  render() {
    return null;
  }

  static transform(DOM) {
    const classNames = getClassNames(DOM);

    return {
      image: DOM.props.src.trim(),
      style: [...classNames, `_${DOM.elementName}`, DOM.elementName],
      ...DOM.props.style || {},
    };
  }
}
