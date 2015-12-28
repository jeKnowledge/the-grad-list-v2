Meteor.publish("posts", function()
{
	return Posts.find({}, {sort: {date: -1}});
});

Meteor.publish("comments", function()
{
	return Comments.find({}, {sort: {date: -1}});
});

Meteor.publish("usersData", function() {
  if (this.userId) {
    return Meteor.users.find({}, {fields: {"username" :true, _id: true, follows: true, followed: true} });
  } else {
    this.ready();
  }
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '795219033939224',
    secret: 'ed6bce59cb18a9dc52810adf6fe74491'
});
