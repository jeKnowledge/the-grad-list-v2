Template.header.helpers({
	userID: function() {
		return Meteor.userId();
	},
	getUsername: function() {
		console.log(Meteor.user());

		return Meteor.user().username;
	}
});


Template.header.events({
	'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
})
