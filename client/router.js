Perseid.subs.config = Meteor.subscribe("config");

Router.map(function(){
    this.route("admin", {
        action: function() {
            this.redirect("adminLogin");
        }
    });

    this.route("adminLogin", {
        path: "/admin/login"
    });

    this.route("setup", {
        waitOn: Perseid.subs.config,
        before: function() {
            //Ensure the setup screen can't be displayed once the setup process is completed
            if (this.ready() && Perseid.colls.config.findOne({_id: "setup"}).completed){
                console.log("App has already been configured, redirecting to admin home");
                this.redirect("admin");
            }
        }
    });

});

Router.configure({
    layoutTemplate: "layout"
});

Router.before(function() {
    var routeName = this.route.name;

    // no need to check at these URLs
    if (routeName === "admin" ||
        routeName === "adminLogin" ||
        routeName.indexOf("admin") !== 0) {

        return;
    }

    var user = Meteor.user();
    if (!user) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
            this.stop();
        }
        else {
            Session.set("admin.login.redirect", routeName);
            this.redirect("adminLogin");
        }
    }
});

Router.after(function() {
    var adminActionsTemplate = this.adminActionsTemplate || this.route.options.adminActionsTemplate;
    var adminStatusTemplate = this.adminStatusTemplate || this.route.options.adminStatusTemplate;

    if (Meteor.userId()) {
        this.render("adminHeader", {to: "header"});

        if (adminActionsTemplate) {
            this.render(adminActionsTemplate, {to: "adminActions"});
        }

        if (adminStatusTemplate) {
            this.render(adminStatusTemplate, {to: "adminStatus"});
        }
    }
});

/* First time run redirection */
Deps.autorun(function(c) {
    if (Perseid.subs.config.ready()) {
        var setup = Perseid.colls.config.findOne({_id: "setup"});
        if (!setup.completed) {
            Router.go("setup");
        }
        c.stop();
    }
});
