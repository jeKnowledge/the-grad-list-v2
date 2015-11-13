Meteor.methods({
	deletePost: function(id) {
		if (Meteor.userId() == Posts.findOne({_id: id}).owner)
			Posts.remove(id);			
	},
	
	forkPost: function(id) {
		var post2 = {
			title: Posts.findOne({_id:id}).title,
			url: Posts.findOne({_id:id}).url,
			owner: Meteor.userId(),
			forkedFrom: Posts.findOne({_id:id}).username,
			date: new Date(),
			username: Meteor.user().username || Meteor.user().profile.name,

		};
		post2._id = Posts.insert(post2);
		}
		
});
