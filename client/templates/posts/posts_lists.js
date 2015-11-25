Template.postsList.helpers({
	posts: function()
	{
		return Posts.find({}, {sort: {date: -1}});
	},
	isLoggedIn: function()
	{
		var user = Meteor.user();
		if(user) {
			return true;
		}
	}
	
});
