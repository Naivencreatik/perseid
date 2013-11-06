Template.adminHeader.events({
    'click .header-logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});