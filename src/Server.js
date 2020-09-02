import PdfPrinter from 'pdfmake';
import fs from 'fs';
import PDFDocument from './PDFDocument';

/**
 * The generated document object.  Just call download
 * @module ServerBundlePDFDocument
 */
class ServerBundlePDFDocument {
  constructor(docDefinition, documentTheme) {
    const finalDocDefinition = {
      ...documentTheme,
      content: docDefinition,
      styles: documentTheme.css,
      name: undefined,
      tableLayouts: undefined,
      fonts: undefined,
      css: undefined,
    };
    // Add Headers and footers if defined
    if (docDefinition.header) finalDocDefinition.header = docDefinition.header;
    if (docDefinition.footer) finalDocDefinition.footer = docDefinition.footer;

    const printer = new PdfPrinter(documentTheme.fonts);

    this.doc = printer.createPdfKitDocument(
      docDefinition,
      { tableLayouts: documentTheme.tableLayouts },
    );
    this.documentName = documentTheme.name || 'New Document.pdf';
  }

  saveTo(directory) {
    this.doc.pipe(fs.createWriteStream(`${directory}/${this.documentName}`));
    this.doc.end();
  }
}

/**
 * The DocFlux Document (exported as Document).
 * @module Client
 */
class Server extends PDFDocument {
  static createDocument(docDefinition, props) {
    const theme = this.getDocumentTheme(props);

    return new ServerBundlePDFDocument(
      docDefinition,
      theme,
    );
  }
}

export default Server;
