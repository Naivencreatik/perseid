Package.describe({
  summary: "Meteor modular CMS"
});

Package.on_use(function (api) {

  var deps = [
    'standard-app-packages',
    'accounts-password',
    'check',
    'smartfile',
    'just-i18n',
    'iron-router',
    'moment'
  ];

  //XXX: why do we need to do this?
  api.imply(deps, ['client', 'server']);
  api.use(deps, ['client', 'server']);

  api.add_files([
    'lib/perseid.js',
    'lib/security.js',
    'lib/match.js',
    'collections/config.js'
  ], ['client', 'server']);

  api.add_files([
    'server/config.js',
  ], 'server');

  api.add_files([
    'client/perseid.js',
    
    'client/collections/config.js',

    'client/i18n/i18n.js',
    'client/i18n/lang/fr.js',
    'client/i18n/lang/fr-moment.js',

    'client/styles/main.css',

    'client/views/layout.html',
    
    'client/views/admin/login.html',
    'client/views/admin/login.js',
    'client/views/admin/setup.html',
    'client/views/admin/setup.js',
    'client/views/admin/header.html',
    'client/views/admin/header.js',
    
    'client/router.js'
  ], 'client');

  api.export('Perseid', ['client', 'server']);
});