Template.postsList.helpers({
	posts: function()
	{
		return Posts.find({}, {sort: {created_at: 1}});
	}
});