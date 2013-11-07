Perseid = {
    modules: {},
    colls: {}
};

Perseid.createModule = function (name) {
    var module = Perseid.modules[name] = {};
    module.colls = {};

    if (Meteor.isClient) {
        module.subs = {};
    }

    return module;
}

Perseid.checkUserId = function (userId) {
    if(!userId) {
        throw new Meteor.Error(403);
    }
};

Perseid.smartfile = function (params) {
    _.each(Perseid.modules, function(module){
        var sf = module.smartfile;
        if (sf) {
            sf.configure(params);
        }
    });
}