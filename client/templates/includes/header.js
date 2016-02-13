Template.header.helpers({

        userID: function() {
            return Meteor.userId();
        },

        getUsername: function() {
            return Meteor.user().username;
        },

        usersIndex: () => UsersIndex,

    inputAttributes: function() {
    return {placeholder: "Search users", class: 'form-control'};
}
});


Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});
