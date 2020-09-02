/* eslint-disable max-len */
import { Document } from '@harvest-profit/doc-flux';
import Parser from './Parser';

import {
  ThemeDefinition, baseStyles, defaultStyles, tableLayouts,
} from './Theme';

const defaultDocumentTheme = {
  name: 'New Document',
  pageMargins: [40, 40, 40, 40],
  pageOrientation: 'portrait',
  pageSize: 'A4',
  css: baseStyles,
  defaultStyle: defaultStyles,
  tableLayouts,
};

function buildDocumentTheme(documentStyling, deprecatedSupport = {}) {
  const docStyling = defaultDocumentTheme;
  const definedDocStyling = documentStyling || {};
  docStyling.fonts = definedDocStyling.fonts || docStyling.fonts;
  docStyling.images = definedDocStyling.images || docStyling.images;
  docStyling.defaultStyle = definedDocStyling.defaultStyle || docStyling.defaultStyle;
  if (!docStyling.defaultStyle.font) {
    const availableFonts = Object.keys(docStyling.fonts);
    if (availableFonts.length > 0) {
      /* eslint-disable prefer-destructuring */
      docStyling.defaultStyle.font = availableFonts[0];
    } else {
      docStyling.defaultStyle.font = 'Roboto';
    }
  }
  docStyling.tableLayouts = definedDocStyling.tableLayouts || deprecatedSupport.tableLayouts || docStyling.tableLayouts;
  docStyling.css = {
    ...docStyling.css || {},
    ...deprecatedSupport.css || {},
    ...definedDocStyling.css || {},
  };

  const deprecatedSettings = deprecatedSupport.settings || {};
  docStyling.name = definedDocStyling.name || deprecatedSettings.name || docStyling.name;
  docStyling.pageMargins = definedDocStyling.pageMargins || deprecatedSettings.pageMargins || docStyling.pageMargins;
  docStyling.pageOrientation = definedDocStyling.pageOrientation || deprecatedSettings.pageOrientation || docStyling.pageOrientation;
  docStyling.pageSize = definedDocStyling.pageSize || deprecatedSettings.pageSize || docStyling.pageSize;
  docStyling.background = definedDocStyling.background || deprecatedSettings.background || docStyling.background;
  docStyling.info = {
    ...docStyling.info || {},
    ...deprecatedSettings.info || {},
    ...definedDocStyling.info || {},
  };

  docStyling.info.title = docStyling.info.title || docStyling.name;

  docStyling.header = definedDocStyling.header || deprecatedSettings.header || docStyling.header;
  docStyling.footer = definedDocStyling.footer || deprecatedSettings.footer || docStyling.footer;
  docStyling.compress = definedDocStyling.compress || deprecatedSettings.compress || docStyling.compress;
  docStyling.watermark = definedDocStyling.watermark || deprecatedSettings.watermark || docStyling.watermark;
  docStyling.pageBreakBefore = definedDocStyling.pageBreakBefore || deprecatedSettings.pageBreakBefore || docStyling.pageBreakBefore;
  docStyling.userPassword = definedDocStyling.userPassword || deprecatedSettings.userPassword || docStyling.userPassword;
  docStyling.ownerPassword = definedDocStyling.ownerPassword || deprecatedSettings.ownerPassword || docStyling.ownerPassword;
  docStyling.permissions = {
    ...docStyling.permissions || {},
    ...deprecatedSettings.permissions || {},
    ...definedDocStyling.permissions || {},
  };

  return docStyling;
}

const deprecatedWarnings = {};
function deprecated(method, message) {
  if (deprecatedWarnings[method]) return;
  /* eslint-disable-next-line no-console */
  console.warn(`${method} is deprecated: ${message}`);
  deprecatedWarnings[method] = true;
}

function validateTheme(theme) {
  const invalidKeys = Object.keys(theme).filter(
    (themeKey) => (ThemeDefinition[themeKey] === undefined),
  );

  if (invalidKeys.length < 1) return;

  /* eslint-disable no-console */
  console.warn(`Invalid theme. The following keys are not allowed: ${invalidKeys.join(', ')}. Use the following definition for reference.`);
  console.warn(ThemeDefinition);
  /* eslint-enable no-console */
}

/**
 * The DocFlux Document (exported as Document).
 * @module PDFDocument
 */
class PDFDocument extends Document {
  static parser = Parser;

  static documentTheme = null;

  static getDocumentTheme(props) {
    let definedTheme = this.documentTheme;
    if (typeof definedTheme === 'function') {
      definedTheme = definedTheme(props);
    }
    const theme = buildDocumentTheme(definedTheme, {
      css: this.callStyleSheet(props),
      tableLayouts: this.callTableLayouts(props),
      settings: this.callDocumentSettings(props),
    });

    validateTheme(theme);
    return theme;
  }

  static createBuilder() {
    return null;
  }

  // DEPRECATED WARNINGS
  // DEPRECATED: Use documentTheme now
  static callStyleSheet(props) {
    if (typeof this.styleSheet === 'function') {
      deprecated('styleSheet', 'Instead use "documentTheme" property with key "css"');
      return this.styleSheet(props);
    }

    return null;
  }

  // DEPRECATED: Use documentTheme now
  static callTableLayouts(props) {
    if (typeof this.tableLayouts === 'function') {
      deprecated('tableLayouts', 'Instead use "documentTheme" property with key "tableLayouts"');
      return this.tableLayouts(props);
    }

    return null;
  }

  // DEPRECATED: Use documentTheme now
  static callDocumentSettings(props) {
    if (typeof this.documentSettings === 'function') {
      deprecated('documentSettings', 'Instead configure using the "documentTheme" property');
      return this.documentSettings(props);
    }

    return null;
  }
}

export default PDFDocument;
