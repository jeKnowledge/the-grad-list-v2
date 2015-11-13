Meteor.publish("posts", function()
{
	return Posts.find({}, {sort: {date: -1}, limit: 20});
});