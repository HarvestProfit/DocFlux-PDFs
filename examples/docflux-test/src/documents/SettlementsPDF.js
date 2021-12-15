// import PropTypes from 'prop-types';
import { Document } from '@harvest-profit/doc-flux-pdfs';
// import defaultPdfStyles from '../defaultPdfStyles';
import Settlements from './components/Settlements';

export default class SettlementsPDF extends Document {
  static stylesheet() {
    return {};
  }

  // Allows you to debug, but download will not work
  // static createDocument(docDefinition) {
  //   console.log(docDefinition);
  // }

  static documentTheme(props) {
    const topMargin = 40;

    const name = 'Settlements';
    return {
      name,
      pageMargins: [30, topMargin, 30, 50],
      pageOrientation: 'portrait',
      defaultStyle: {
        font: 'MyFont',
      },
      fonts: {
        'MyFont': {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        }
      }
    };
  }

  static component = Settlements;
}
