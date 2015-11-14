Template.postsList.helpers({
	posts: function()
	{
		return Posts.find({}, {sort: {date: -1}});
	}
});
