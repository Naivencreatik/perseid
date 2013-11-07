Template.adminLogin.events({
    'submit': function(event, template){
        event.preventDefault();
        debugger;
        Meteor.loginWithPassword(
            template.find('#user-login').value,
            template.find('#user-password').value,
            function(err) {
                if (err) {
                    if (err.error === 403) {
                        Session.set('login.error', 'login.error.forbidden');
                    }
                    else {
                        Session.set('login.error', 'login.error.unknown');
                    }
                }
                else {
                    Router.go(Session.get("admin.login.redirect") || "/");
                }
            });
    }
});

Template.adminLogin.helpers({
    error: function(){
        var errorKey = Session.get('login.error');
        if (errorKey) {
            return i18n(errorKey);
        }
    }
});