import _ from 'lodash';
import { Document } from '@harvest-profit/doc-flux';
import PdfMake from 'pdfmake/build/pdfmake';
import PdfFonts from 'pdfmake/build/vfs_fonts';
import Parser from './Parser';

import styles, { defaultStyles } from './styles';

PdfMake.vfs = PdfFonts.pdfMake.vfs;

/**
 * The generated document object.  Just call download
 * @module GeneratedDocument
 */
class GeneratedDocument {
  constructor(docDefinition, settings, mergedStyles, tableLayouts) {
    const finalDocDefinition = {
      content: docDefinition,
      styles: mergedStyles,
      defaultStyle: defaultStyles,
      ..._.pick(settings, ['pageSize', 'pageOrientation', 'pageMargins', 'background', 'info']),
    };
    if (docDefinition.header) finalDocDefinition.header = docDefinition.header;
    if (docDefinition.footer) finalDocDefinition.footer = docDefinition.footer;

    this.doc = PdfMake.createPdf(finalDocDefinition, tableLayouts);

    this.documentName = settings.name || 'New Document.pdf';
  }

  download() {
    this.doc.download(this.documentName);
  }

  open() {
    this.doc.open();
  }
}

/**
 * The DocFlux Document (exported as Document).
 * @module PDFDocument
 */
export default class PDFDocument extends Document {
  static documentSettings() {
    return {
      name: 'New Document.pdf',
    };
  }

  static styleSheet() {
    return {};
  }

  static tableLayouts() {
    return {
      zebra: {
        fillColor: rowIndex => ((rowIndex % 2 === 0) ? '#CCCCCC' : null),
      },
    };
  }

  static createDocument(docDefinition, props) {
    const mergedStyles = {
      ...styles,
      ...this.styleSheet(),
    };
    return new GeneratedDocument(
      docDefinition, this.documentSettings(props), mergedStyles, this.tableLayouts(),
    );
  }

  static createBuilder() {
    return null;
  }

  static parser = Parser;
}
