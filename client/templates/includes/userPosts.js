Template.userPosts.helpers({
	postsByMe: function() {
		return Posts.find({owner: Meteor.userId()});
	}
});