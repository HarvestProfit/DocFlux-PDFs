import PdfPrinter from 'pdfmake';
import fs from 'fs';
import PDFDocument from './PDFDocument';

/**
 * The generated document object.  Just call download
 * @module ServerBundlePDFDocument
 */
class ServerBundlePDFDocument {
  constructor(docContents, documentTheme) {
    const pdfmakeDocumentConfig = {
      ...documentTheme,
      content: docContents,
      styles: documentTheme.css,
      name: undefined,
      tableLayouts: undefined,
      fonts: undefined,
      css: undefined,
    };
    // Add Headers and footers if defined
    if (docContents.header) pdfmakeDocumentConfig.header = docContents.header;
    if (docContents.footer) pdfmakeDocumentConfig.footer = docContents.footer;

    const printer = new PdfPrinter(documentTheme.fonts);

    this.doc = printer.createPdfKitDocument(
      pdfmakeDocumentConfig,
      { tableLayouts: documentTheme.tableLayouts },
    );
    this.documentName = documentTheme.name || 'New Document.pdf';
  }

  saveTo(directory) {
    return this.saveAs(`${directory}/${this.documentName}`);
  }

  saveAs(filename) {
    let ext = '';
    if (!filename.endsWith('.pdf')) ext = '.pdf';
    this.doc.pipe(fs.createWriteStream(`${filename}${ext}`));
    this.doc.end();
    return filename;
  }
}

/**
 * The DocFlux Document (exported as Document).
 * @module Client
 */
class Server extends PDFDocument {
  static createDocument(docContents, props) {
    const theme = this.getDocumentTheme(props);

    return new ServerBundlePDFDocument(
      docContents,
      theme,
    );
  }
}

export default Server;
