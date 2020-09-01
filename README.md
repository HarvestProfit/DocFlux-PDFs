# DocFlux PDFs
[![npm](https://img.shields.io/npm/v/@harvest-profit/doc-flux-pdfs.svg)](https://www.npmjs.com/package/@harvest-profit/doc-flux-pdfs)  [![Build Status](https://travis-ci.org/HarvestProfit/DocFlux-PDFs.svg?branch=master)](https://travis-ci.org/HarvestProfit/DocFlux-PDFs) [![Coverage Status](https://coveralls.io/repos/github/HarvestProfit/DocFlux-PDFs/badge.svg?branch=master)](https://coveralls.io/github/HarvestProfit/DocFlux-PDFs?branch=master) [![npm](https://img.shields.io/npm/l/@harvest-profit/doc-flux-pdfs.svg)](https://github.com/HarvestProfit/DocFlux-PDFs/blob/master/LICENSE)

Allows you to create pdfMake pdfs using [DocFlux](https://github.com/HarvestProfit/DocFlux).

## Example
This will generate a table with 2 rows in it.
```jsx
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

export default ExampleComponent = () => (
  <table>
    <thead>
      <th className="font-weight-bold">Name</th>
      <th className="differentFont">Age</th>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>24</td>
      </tr>
      <tr>
        <td>Jill</td>
        <td>25</td>
      </tr>
    </tbody>
  </table>
);
```

## Document Example
```jsx
const style = {
  fonts: {
    Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
    OtherFont: {
      normal: 'urltootherfont',
    },
  },
  css: {
    differentFont: {
      color: 'blue',
      font: 'OtherFont',
      bold: false
    },
    'font-weight-bold': {
      bold: true,
    },
  },
  default: {
    font: 'Roboto',
    fontSize: 10,
    color: '#333333',
  },
};

class ExampleDoc extends PDFDocument {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static documentStyling = style;

  static documentSettings(props) {
    return {
      name: props.name,
      pageMargins: [30, 55, 30, 40],
      info: {
        title: 'Sample Document',
        author: 'john doe',
        subject: 'Sampling Document Building',
        keywords: 'sample',
        creator: 'Harvest Profit',
        producer: 'Harvest Profit',
      },
    };
  }

  // Override this method to log document definition for debugging
  // static createDocument(docDefinition) {
  //   console.log(docDefinition);
  // }

  static component = ExampleComponent;
}

const doc = ExampleDoc.create({
  name: 'sample.pdf',
  names: ['John', 'Jill'],
  ages: [24, 25],
});

doc.download();
// You can also just open this in the browser via
// doc.open();

```

## Styling and Configuration
Styling can be a bit tricky (mostly layout stuff like columns). You can use [pdfmake playground](http://pdfmake.org/playground.html) to try out the styling.

Be sure to check out the documentation for PDFMake on what other styling and font
things you can do. You can always use a `<raw data={...pdfmakeJSON} />` component
to gain access to the PDFmake api.

## Development
[Clone](https://help.github.com/articles/cloning-a-repository/) this repo, and begin committing changes. PRs are preferred over committing directly to master.

To run tests locally on your machine, run the following:
```bash
yarn run test
```

To preview documentation locally on your machine, run the following:
```bash
yarn run build-docs
```

After merging your pull request, consider updating the documentation with the following command:
```bash
yarn run publish-docs
```

To deploy a new version to NPM, bump the version number, commit/merge to `master`, and run the following:
```bash
yarn run clean
yarn run build

# Either NPM
npm publish
# Or Yarn, they do the same thing
yarn publish
```

## License
This project is [MIT licensed](https://github.com/HarvestProfit/DocFlux-PDFs/blob/master/LICENSE)
