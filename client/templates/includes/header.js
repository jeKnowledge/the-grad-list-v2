Template.header.helpers({

        userID: function() {
            return Meteor.userId();
        },

        getUsername: function() {
            return Meteor.user().username;
        },

        usersIndex: () => UsersIndex,

    inputAttributes: function() {
    return {placeholder: "Search clients, orders and suppliers...", class: 'form-control'};
}
});


Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});