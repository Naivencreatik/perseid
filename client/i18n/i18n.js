i18n.setDefaultLanguage("fr");

Deps.autorun(function () {
    moment.lang(i18n.getLanguage());
});