import PropTypes from 'prop-types';
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

import PDFDocument from '../src/PDFDocument';

const SimpleComponent = () => (
  <table>
    <thead>
      <th>h1</th>
    </thead>
    <tbody>
      <tr>
        <td>d1</td>
      </tr>
    </tbody>
  </table>
);

class Doc extends PDFDocument {
  static component = SimpleComponent;

  static documentSettings(props) {
    return {
      name: props.name,
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
  }
}

describe('PDFDocument', () => {
  describe('create', () => {
    it('should create a document from a pdf document', () => {
      const doc = Doc.create({
        name: 'My Document.pdf',
      });

      expect(doc.documentName).toBe('My Document.pdf');
    });
  });
});
