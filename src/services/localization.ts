import { getLocalized } from "./locales";

let LOCALE = '';

export const setLocale = (locale: string) => LOCALE = locale;

export const __ = (key: string): string => getLocalized(LOCALE, key);