Template.header.helpers({
	userID: function() {
		return Meteor.userId();
	},
	username: function() {
		return Meteor.user().username || Meteor.user().profile.name;
	}
})
