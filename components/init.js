import "sprintf-js";

window.I18n = function (options) {
    for (var prop in options) {
        this[prop] = options[prop];
    };

    this.setLocale(this.locale);
};

I18n.localeCache = {};

I18n.prototype = {
    defaultLocale: "en",
    directory: "/i18n_catalog",
    getLocale: function () {
        return this.locale;
    },
    setLocale: function (locale) {
        if (!locale)
            locale = document.querySelector('html').getAttribute('lang');

        if (!locale)
            locale = this.defaultLocale;

        this.locale = locale;

        if (locale in I18n.localeCache) return;
        else this.getLocaleFileFromServer();
    },
    getLocaleFileFromServer: function () {
        fetch(this.directory, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ lang: this.locale })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                I18n.localeCache[this.locale] = data;
            });
    },

    __: function () {
        var msg = I18n.localeCache[this.locale][arguments[0]] || arguments[0];
        if (arguments.length > 1)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 1));

        return msg;
    },

    __n: function (singular, count) {
        var msg = I18n.localeCache[this.locale][singular];

        count = parseInt(count, 10);
        if (count === 0)
            msg = msg.zero;
        else
            msg = count > 1 ? msg.other : msg.one;

        msg = vsprintf(msg, [count]);

        if (arguments.length > 2)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 2));

        return msg;
    }
};