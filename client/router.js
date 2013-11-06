Perseid.subs.config = Meteor.subscribe("config");

Router.map(function(){
    this.route("admin");

    this.route("adminLogin", {
        path: "/admin/login"
    });

    this.route("setup", {
        waitOn: Perseid.subs.config,
        before: function () {
            //Ensure the setup screen can't be displayed once the setup process is completed
            if (this.ready() && Perseid.colls.config.findOne({_id: "setup"}).completed){
                console.log("App has already been configured, redirecting to admin home");
                this.redirect("admin");
            }
        }
    });

});

Router.configure({
    layoutTemplate: "layout",

    yieldTemplates: {
        "header": { to: "header" }
    }
});

Router.before(function () {
    var routeName = this.route.name;

    // no need to check at these URLs
    if (routeName === "adminLogin" || routeName.indexOf("admin") !== 0)
        return;

    var user = Meteor.user();
    if (!user) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
            this.stop();
        }
        else {
            this.redirect("adminLogin");
        }
    }
});

/* First time run redirection */
Deps.autorun(function(c){
    if (Perseid.subs.config.ready()){
        var setup = Perseid.colls.config.findOne({_id: "setup"});

        if (!setup.completed) {
            Router.go("setup");
        }

        c.stop();
    }
});
