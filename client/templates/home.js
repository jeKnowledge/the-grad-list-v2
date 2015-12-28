Template.home.helpers({
  user: function(){
      return Meteor.users.find({
      	$and:
      	[{"_id": { $nin: Meteor.user().follows}},
      	{"_id": { $ne: Meteor.userId() }}]
      	});
  }	
})
