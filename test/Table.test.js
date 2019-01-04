import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

import Parser from '../src/Parser';

// eslint-disable-next-line no-console
console.error = jest.fn((error) => {
  throw new Error(error);
});

describe('Table', () => {
  describe('transform', () => {
    it('should create a document from a table', () => {
      const component = DocFlux.render(
        <table>
          <thead>
            <th>h1</th>
          </thead>
          <tbody>
            <tr>
              <td>d1</td>
            </tr>
          </tbody>
        </table>,
        Parser,
      );

      const docDefinition = DocFlux.transform(component);
      expect(docDefinition.table.headerRows).toBe(1);
      expect(docDefinition.table.body.length).toBe(2);
    });
  });
});
