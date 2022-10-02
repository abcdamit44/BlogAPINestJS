// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');
// import pluralize from 'pluralize';

export function snakeCase(str: string): string {
  return (
    str
      // ABc -> a_bc
      .replace(/([A-Z])([A-Z])([a-z])/g, '$1_$2$3')
      // aC -> a_c
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .toLowerCase()
  );
}
export function snakeCasePlural(str: string): string {
  return pluralize(
    str
      // ABc -> a_bc
      .replace(/([A-Z])([A-Z])([a-z])/g, '$1_$2$3')
      // aC -> a_c
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .toLowerCase(),
  );
}
