Template.header.helpers({

	userID: function() {
		return Meteor.userId();
	},

	getUsername: function() {
		return Meteor.user().username;
	},

	usersIndex: () => UsersIndex,
});


Template.header.events({
	'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});
