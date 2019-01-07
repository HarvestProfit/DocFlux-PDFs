import { DOMComponent } from '@harvest-profit/doc-flux';
/**
 * Renders a page break in the PDF
 */
export default class Raw extends DOMComponent {
  static transform(DOM) {
    return DOM.props.data;
  }
}
