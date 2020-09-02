import PropTypes from 'prop-types';
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

import Client from '../src/Client';

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

class DeprDoc extends Client {
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

class Doc extends Client {
  static component = SimpleComponent;

  static documentTheme = {
    name: 'My Doc',
  };
}

class DocWithPropTheme extends Client {
  static component = SimpleComponent;

  static documentTheme = (props) => ({
    name: props.name,
  })
}

describe('Client', () => {
  describe('create', () => {
    it('should create a document from a pdf document using deprecated settings', () => {
      const doc = DeprDoc.create({
        name: 'My Document.pdf',
      });

      expect(doc.documentName).toBe('My Document.pdf');
    });

    it('should create a document from a pdf document', () => {
      const doc = Doc.create({});

      expect(doc.documentName).toBe('My Doc');
    });

    it('should create a document from a pdf document with prop theming', () => {
      const doc = DocWithPropTheme.create({
        name: 'My Document',
      });

      expect(doc.documentName).toBe('My Document');
    });
  });
});
