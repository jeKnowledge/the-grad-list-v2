Meteor.publish("posts", function()
{
	return Posts.find({}, {sort: {date: -1}, limit: 20});
});

Meteor.publish("usersData", function() {
  if (this.userId) {
    return Meteor.users.find({}, {fields: {"username" :true, _id: true} });
  } else {
    this.ready();
  }
});