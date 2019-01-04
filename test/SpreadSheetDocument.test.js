import PropTypes from 'prop-types';
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

import SpreadSheetDocument from '../src/SpreadSheetDocument';

const SimpleComponent = () => (
  <table>
    <tname>My Table</tname>
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

class Doc extends SpreadSheetDocument {
  static component = SimpleComponent;
  static documentSettings(props) {
    return {
      type: props.fileType,
      name: props.name,
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    fileType: PropTypes.oneOf(['csv', 'xlsx']),
  }

  static defaultProps = {
    fileType: 'csv',
  }
}

describe('SpreadSheetDocument', () => {
  describe('create', () => {
    it('should create a document from a spread sheet document', () => {
      const doc = Doc.create({
        name: 'My Document',
        fileType: 'csv',
      });

      expect(doc.filename).toBe('My Document');
      expect(doc.extension).toBe('csv');
      expect(doc.doc.constructor).toBe(ArrayBuffer);
    });
  });
});
