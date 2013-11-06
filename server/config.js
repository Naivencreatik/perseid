Meteor.publish("config", function() {
    return Perseid.colls.config.find();
});

Meteor.methods({
    "config.initialSetup": function(params) {
        var completed = Perseid.colls.config.findOne({_id:'setup'}).completed;

        if (completed) {
            throw new Meteor.Error(400, "CMS is alreay configured");
        }

        //XXX: unsafe!!!
        Accounts.createUser(params);

        Perseid.colls.config.update({_id: 'setup'}, {$set: {completed: true}});
    }
});

Meteor.startup(function () {
    if (!Perseid.colls.config.findOne({_id: 'setup'})){
        Perseid.colls.config.insert({_id: 'setup', completed: false});
    }
});