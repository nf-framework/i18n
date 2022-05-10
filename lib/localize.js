import * as i18n_default from "i18n";
import fs from "fs";
let i18n = i18n_default.default;

export function localize(text, params) {
    return i18n.__(text, params);
}

export function localize_n(text, count) {
    return i18n.__n(text, count);
}

export function addLocaleFile(locale, file) {
    let catalog = i18n.getCatalog();
    if (!catalog) {
        return;
    }

    let localeFile = fs.readFileSync(file);
    let newLocale = JSON.parse(localeFile);

    catalog[locale] = catalog[locale] ? { ...catalog[locale], ...newLocale } : newLocale;
};

export async function getCatalog(context) {
    const catalog = i18n.getCatalog()
    context.send(catalog[context.body.lang]);
}
