Template.header.helpers({
	userID: function() {
		return Meteor.userId();
	},
	getUsername: function() {
		return Meteor.user().username || Meteor.user().profile.name;
	}
})
