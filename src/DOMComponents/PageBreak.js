import { DOMComponent } from '@harvest-profit/doc-flux';
import PropTypes from 'prop-types';
/**
 * Renders a page break in the PDF
 */
export default class PageBreak extends DOMComponent {
  static propTypes = {
    orientation: PropTypes.string,
  }

  static transform(DOM) {
    if (DOM.props.orientation) {
      return {
        pageOrientation: DOM.props.orientation,
        pageBreak: 'after',
      };
    }
    return {
      text: '',
      pageBreak: 'after',
    };
  }
}
