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
    return Meteor.users.find({}, {fields: {"username" :true, _id: true, follows: true, followed: true,
      'services.facebook.name': true, 'bio':true, 'country': true, 'university': true
    }});
  } else {
    this.ready();
  }
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '456456687891709',
    secret: 'a44659b9325db81c25af3a15ef74da60'
});
