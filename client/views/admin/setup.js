Template.setup.events({
    "submit": function(event, template){
        event.preventDefault();

        var pwd = template.find("#user-password").value;
        var pwdconf = template.find("#user-password-confirm").value;

        if (pwd !== pwdconf) {
            alert(i18n("setup.error.passwordmismatch"));
            return;
        }

        Accounts.createUser({
            username: template.find("#user-login").value,
            password: pwd,
        }, function(err){
            if (err){
                Session.set('setup.error', err);
            }
            else {  
                Meteor.call("config.initialSetup");
                Router.go("/");
            }
        });
    }
});

Template.setup.helpers({
    error: function(){
        return Session.get('setup.error');
    }
});