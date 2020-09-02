import 'pdfmake/build/pdfmake'; // not sure why but in some versions of Babel/Webpack, pdfmake will not import unless done this way.
import PDFDocument from './PDFDocument';

/**
 * The generated document object.  Just call download
 * @module WebBundlePDFDocument
 */
class WebBundlePDFDocument {
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

    this.doc = window.pdfMake.createPdf(
      finalDocDefinition,
      documentTheme.tableLayouts,
      documentTheme.fonts,
    );

    this.documentName = documentTheme.name || 'New Document.pdf';
  }

  toFile() {
    return new Promise((resolve) => {
      this.doc.getBlob((blob) => {
        resolve(new File([blob], this.documentName));
      });
    });
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
 * @module Client
 */
class Client extends PDFDocument {
  static createDocument(docDefinition, props) {
    const theme = this.getDocumentTheme(props);

    return new WebBundlePDFDocument(
      docDefinition,
      theme,
    );
  }
}

export default Client;
