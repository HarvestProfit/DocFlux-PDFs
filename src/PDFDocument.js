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
  constructor(docDefinition, settings, mergedStyles) {
    this.doc = PdfMake.createPdf({
      content: docDefinition,
      styles: mergedStyles,
      defaultStyle: defaultStyles,
    });

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
    return {};
  }

  static saveSettings() {
    return {
      name: 'New Document.pdf',
    };
  }

  static styleSheet() {
    return {};
  }

  static createDocument(docDefinition, props) {
    const mergedStyles = {
      ...styles,
      ...this.styleSheet(),
    };
    return new GeneratedDocument(docDefinition, this.saveSettings(props), mergedStyles);
  }

  static createBuilder() {
    return null;
  }

  static parser = Parser;
}
