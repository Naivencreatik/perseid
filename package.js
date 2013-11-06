Package.describe({
  summary: "Meteor modular CMS"
});

Package.on_use(function (api) {
  api.use([
    'standard-app-packages',
    'accounts-password',
    'dumb-i18n',
    'iron-router'
  ], ['client', 'server']);

  api.add_files([
    'lib/perseid.js',
    'lib/security.js',
    'collections/config.js'
  ], ['client', 'server']);

  api.add_files([
    'server/config.js',
  ], 'server');

  api.add_files([
    'client/perseid.js',
    
    'client/collections/config.js',

    'client/i18n/fr.js',

    'client/styles/main.css',

    'client/views/layout.html',
    'client/views/admin/admin.html',
    'client/views/admin/login.html',
    'client/views/admin/login.js',
    'client/views/admin/setup.html',
    'client/views/admin/setup.js',
    'client/views/header/header.html',
    'client/views/header/header.js',
    
    'client/router.js'
  ], 'client');
});