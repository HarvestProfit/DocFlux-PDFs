export const ThemeDefinition = {
  name: 'The document file name. You do not need to add the "pdf" extension.',
  pageMargins: 'An array of page margins. Defaults to: [40, 40, 40, 40]',
  pageOrientation: 'The page orientation. Either: portrait or landscape. Defaults to portrait.',
  pageSize: 'A page size defined like "A4" or an object with height and width.',
  background: 'The page color.',
  header: 'The optional PDFMake header function for generating the document. It is preferred to use the <header /> component instead.',
  footer: 'The optional PDFMake footer function for generating the document. It is preferred to use the <footer /> component instead.',
  compress: 'Boolean. If the pdf should be compressed or not. Defaults to true.',
  watermark: 'The PDFMake definition for a watermark',
  pageBreakBefore: 'The PDFMake function allowing you to define how to break pages. It is preferred to use the <br /> component instead.',
  userPassword: 'For password protecting',
  ownerPassword: 'For password protecting',
  permissions: {
    printing: 'permissions for printing. Either: highResolution or lowResolution',
    modifying: 'Allow modifying',
    copying: 'Allow copying',
    annotating: 'Allow annotating',
    fillingForms: 'Allow filling forms',
    contentAccessibility: 'Allow content accessibility',
    documentAssembly: 'Allow document assembly',
  },
  info: {
    title: 'The document title',
    author: 'The document author',
    subject: 'The document subject',
    keywords: 'Document keywords',
    creator: 'The document creator',
    producer: 'The document producer',
  },
  css: 'An Object of class name styles. See PDFMake for styling. Apply a style to a node by the "className" prop.',
  defaultStyle: 'Default styles. Things like default font size, color, or font family',
  tableLayouts: 'Custom defined table layouts. See PDFMake for how to create a table layout. Pass the key name of the layout to the "layout" prop on a <table /> component. Use "default" to define the default theme',
  fonts: 'An object containing custom font declarations. If no "font" is defined in "defaultStyles", the first in this object will be used',
  images: 'An object containing image declarations. For client side, these can be URLs.',
};

export const defaultStyles = {
  fontSize: 12,
  color: '#000000',
  font: 'Roboto',
};

export const RobotoWeb = {
  normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
  bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
  italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
  bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
};

export const tableLayouts = {
  main: {},
  zebra: {
    fillColor: (rowIndex) => ((rowIndex % 2 === 0) ? '#CCCCCC' : null),
  },
};

export const baseStyles = {
  _h1: {
    fontSize: 24,
    bold: true,
  },
  _h2: {
    fontSize: 20,
    bold: true,
  },
  _h3: {
    fontSize: 18,
    bold: true,
  },
  _h4: {
    fontSize: 16,
    bold: true,
  },
  _h5: {
    fontSize: 14,
    bold: true,
  },
  _h6: {
    fontSize: 12,
    bold: true,
  },
  _p: {
    fontSize: 12,
  },
  _small: {
    fontSize: 10,
  },
  _b: {
    bold: true,
  },
  _em: {
    italics: true,
  },
  _a: {
    decoration: 'underline',
    color: 'blue',
  },
};
