import path from 'path';
import { addLocaleFile, getCatalog } from "./lib/localize.js";
import { registerLibDir } from "@nfjs/front-server";
import { web } from "@nfjs/back";
const __dirname = path.join(path.dirname(decodeURI(new URL(import.meta.url).pathname))).replace(/^\\([A-Z]:\\)/, "$1");

export async function init() {
    registerLibDir('sprintf-js');
    addLocaleFile('ru', path.join(__dirname, 'locales', 'ru.json'))

    web.on('POST', '/i18n_catalog', { middleware: ['json'] }, getCatalog)
}
