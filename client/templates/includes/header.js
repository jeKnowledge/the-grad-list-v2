Template.header.helpers({
	userID: function() {
		return Meteor.userId();
	},
	getUsername: function() {
		console.log(Meteor.user());

		return Meteor.user().username || Meteor.user().services.facebook.name;
	}
});


Template.header.events({
	'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
})
