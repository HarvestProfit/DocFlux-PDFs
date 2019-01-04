import XLSX from 'xlsx';
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
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <table>
          <tname>Test</tname>
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

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Test');
      expect(newWorkbook.Sheets.Test.A1.v).toBe('h1');
      expect(newWorkbook.Sheets.Test.A2.v).toBe('d1');
    });

    it('should create a document from a table with a generated name', () => {
      const workbook = XLSX.utils.book_new();
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

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Sheet');
    });

    it('should create a document with 2 tables.', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <div>
          <table>
            <tname>Table 1</tname>
            <thead>
              <th>h1</th>
            </thead>
            <tbody>
              <tr>
                <td>d1</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tname>Table 2</tname>
            <thead>
              <th>h2</th>
            </thead>
            <tbody>
              <tr>
                <td>d2</td>
              </tr>
            </tbody>
          </table>
        </div>,
        Parser,
      );

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Table 1');
      expect(newWorkbook.Sheets['Table 1'].A1.v).toBe('h1');
      expect(newWorkbook.Sheets['Table 1'].A2.v).toBe('d1');
      expect(newWorkbook.SheetNames[1]).toBe('Table 2');
      expect(newWorkbook.Sheets['Table 2'].A1.v).toBe('h2');
      expect(newWorkbook.Sheets['Table 2'].A2.v).toBe('d2');
    });

    it('should create a document with 2 tables, incrementing same names', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <div>
          <table>
            <tname>Table</tname>
            <thead>
              <th>h1</th>
            </thead>
            <tbody>
              <tr>
                <td>d1</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tname>Table</tname>
            <thead>
              <th>h2</th>
            </thead>
            <tbody>
              <tr>
                <td>d2</td>
              </tr>
            </tbody>
          </table>
        </div>,
        Parser,
      );

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Table');
      expect(newWorkbook.Sheets.Table.A1.v).toBe('h1');
      expect(newWorkbook.Sheets.Table.A2.v).toBe('d1');
      expect(newWorkbook.SheetNames[1]).toBe('Table 2');
      expect(newWorkbook.Sheets['Table 2'].A1.v).toBe('h2');
      expect(newWorkbook.Sheets['Table 2'].A2.v).toBe('d2');
    });

    it('should create a document with an invalid name and correct it', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <table>
          <tname>*Table/One [small]?</tname>
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

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Table-One (small)');
      expect(newWorkbook.Sheets['Table-One (small)'].A1.v).toBe('h1');
    });

    it('should create a document with a longer than 30 char name and correct it', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <table>
          <tname>*Table/One [small] areallyreallyreallyreallylongname?</tname>
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

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.SheetNames[0]).toBe('Table-One (small) areallyreal');
      expect(newWorkbook.Sheets['Table-One (small) areallyreal'].A1.v).toBe('h1');
    });

    it('should create a document with a number as a value and an empty header', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <table>
          <tname>Table</tname>
          <thead>
            <th />
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
            </tr>
          </tbody>
        </table>,
        Parser,
      );

      const newWorkbook = DocFlux.transform(component, workbook);
      expect(newWorkbook.Sheets.Table.A1.v).toBe('');
      expect(newWorkbook.Sheets.Table.A2.v).toBe('1');
    });

    it('should create a document with a combination of values', () => {
      const workbook = XLSX.utils.book_new();
      const component = DocFlux.render(
        <table>
          <tname>{{ name: 'test' }} Table {1}</tname>
          <thead>
            <th>
              {{ t: 1 }}
              {1}
              hey
              {NaN}
              {null}
              {undefined}
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ t: 1 }}
                {1}
                hey
                {NaN}
                {null}
                {undefined}
              </td>
            </tr>
          </tbody>
        </table>,
        Parser,
      );

      const newWorkbook = DocFlux.transform(component, workbook);
      const tableName = '(object Object) Table 1';
      expect(newWorkbook.SheetNames[0]).toBe(tableName);
      expect(newWorkbook.Sheets[tableName].A1.v).toBe('[object Object]1heyNaNnullundefined');
      expect(newWorkbook.Sheets[tableName].A2.v).toBe('[object Object]1heyNaNnullundefined');
    });
  });
});
