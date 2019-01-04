# DocFlux PDFs
[![npm](https://img.shields.io/npm/v/@harvest-profit/doc-flux-pdfs.svg)](https://www.npmjs.com/package/@harvest-profit/doc-flux-pdfs)  [![Build Status](https://travis-ci.org/HarvestProfit/DocFlux-Spreadsheets.svg?branch=master)](https://travis-ci.org/HarvestProfit/DocFlux-Spreadsheets) [![Coverage Status](https://coveralls.io/repos/github/HarvestProfit/DocFlux-Spreadsheets/badge.svg?branch=master)](https://coveralls.io/github/HarvestProfit/DocFlux-Spreadsheets?branch=master) [![npm](https://img.shields.io/npm/l/@harvest-profit/doc-flux-pdfs.svg)](https://github.com/HarvestProfit/DocFlux-Spreadsheets/blob/master/LICENSE)

Allows you to create jsPDF pdfs using [DocFlux](https://github.com/HarvestProfit/DocFlux).

## Example
This will generate a table with 2 rows in it with a table name (for XLSX) called People.
```jsx
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */

export default ExampleComponent = () => (
  <table>
    <tname>People</tname>
    <thead>
      <th>Name</th>
      <th>Age</th>
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
This project is [MIT licensed](https://github.com/HarvestProfit/DocFlux-Spreadsheets/blob/master/LICENSE)
