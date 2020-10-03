

const prettyPrint = (loggingFn: (str: string) => void) => (obj: unknown) => loggingFn(prettify(obj))

const prettify = (obj: unknown) => JSON.stringify(obj, null, 2);

export const prettyInfo = prettyPrint(console.info);
export const prettyLog = prettyPrint(console.log);
export const prettyWarn = prettyPrint(console.warn);
export const prettyError = prettyPrint(console.error);
