import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Renders text.
 */
export default class Image extends DOMComponent {
  render() {
    return null;
  }

  static transform(DOM) {
    let classNames = [];
    if ((DOM.props.className || '').trim().length > 0) {
      classNames = (DOM.props.className || '').split(/\s./).map(className => `.${className}`);
    }

    return {
      image: DOM.props.src,
      style: [...classNames, DOM.elementName],
      ...DOM.props.style || {},
    };
  }
}
