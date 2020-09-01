export function parseText(child, variables) {
  return Object.keys(variables || {}).reduce((finalString, vName) => finalString.replace(`#${vName}#`, variables[vName]), child);
}

export function getClassNames(DOM) {
  let classNames = [];
  if ((DOM.props.className || '').trim().length > 0) {
    classNames = (DOM.props.className || '').split(/\s*\s\s*/);
  }
  return classNames;
}

export function pick(object, attributes) {
  return attributes.reduce((finalObject, attribute) => ({
    ...finalObject,
    [attribute]: object[attribute],
  }), {});
}
