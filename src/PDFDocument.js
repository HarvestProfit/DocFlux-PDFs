import { Document } from '@harvest-profit/doc-flux';
import PdfMake from 'pdfmake/build/pdfmake';
import Parser from './Parser';
import { pick } from './DOMComponents/Utilities';

import styles, { defaultStyles } from './styles';

/**
 * The generated document object.  Just call download
 * @module GeneratedDocument
 */
class GeneratedDocument {
  constructor(docDefinition, settings, documentStyling) {
    const restOfSettings = pick(settings, ['pageSize', 'pageOrientation', 'pageMargins', 'background', 'info']);
    const finalDocDefinition = {
      content: docDefinition,
      styles: documentStyling.css,
      defaultStyle: documentStyling.default,
      ...restOfSettings,
    };
    if (docDefinition.header) finalDocDefinition.header = docDefinition.header;
    if (docDefinition.footer) finalDocDefinition.footer = docDefinition.footer;

    this.doc = PdfMake.createPdf(
      finalDocDefinition,
      documentStyling.tableLayouts,
      documentStyling.fonts,
    );

    this.documentName = settings.name || 'New Document.pdf';
  }

  download() {
    this.doc.download(this.documentName);
  }

  open() {
    this.doc.open();
  }
}

export const Roboto = {
  normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
  bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
  italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
  bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
};

export const tableLayouts = {
  zebra: {
    fillColor: (rowIndex) => ((rowIndex % 2 === 0) ? '#CCCCCC' : null),
  },
};

const defaultDocumentStyling = {
  css: styles,
  fonts: { Roboto },
  default: defaultStyles,
  tableLayouts,
};

/**
 * The DocFlux Document (exported as Document).
 * @module PDFDocument
 */
class PDFDocument extends Document {
  static parser = Parser;

  static documentSettings() {
    return {
      name: 'New Document.pdf',
    };
  }

  static documentStyling = null;

  // DEPRECATED: Use documentStyling now
  static styleSheet() { return {}; }

  // DEPRECATED: Use documentStyling now
  static tableLayouts() { return tableLayouts; }

  static createDocument(docDefinition, props) {
    const docStyling = defaultDocumentStyling;
    const definedDocStyling = this.documentStyling || {};
    docStyling.fonts = definedDocStyling.fonts || docStyling.fonts;
    docStyling.default = definedDocStyling.default || docStyling.default;
    if (!docStyling.default.font) {
      const availableFonts = Object.keys(docStyling.fonts);
      if (availableFonts.length > 0) {
        docStyling.default.font = availableFonts[0];
      } else {
        docStyling.default.font = 'Roboto';
      }
    }
    docStyling.tableLayouts = definedDocStyling.tableLayouts || docStyling.tableLayouts;
    docStyling.css = {
      ...docStyling.css,
      ...(definedDocStyling.css || this.styleSheet()),
    };

    return new GeneratedDocument(
      docDefinition,
      this.documentSettings(props),
      docStyling,
    );
  }

  static createBuilder() {
    return null;
  }
}

export default PDFDocument;
