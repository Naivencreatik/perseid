Template.adminHeader.events({
    'click .logout': function(event) {
        Meteor.logout();
    }
});