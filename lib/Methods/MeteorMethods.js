Meteor.methods({
	deletePost: function(id) {
		if (Meteor.userId() == Posts.findOne({_id: id}).owner)
			Posts.remove(id);			
	},
	
	forkPost: function(id) {
		var post2 = {
			title: Posts.findOne({_id:id}).title,
			owner: Meteor.userId(),
			forkedFrom: Posts.findOne({_id:id}).username,
			date: new Date(),
			username: Meteor.user().username || Meteor.user().profile.name,
			image: Posts.findOne({_id:id}).image,
                        completed: 0,
                };
		post2._id = Posts.insert(post2);
        },
        followId: function(id) {
            
            Meteor.users.update(Meteor.userId(), {$addToSet: {follows: id}});
            /*Meteor.users.findOne({_id: Meteor.userId() }).follows.push(id);
            console.log(id +" " + Meteor.userId());*/
        },
	
	addCommentToPost: function(postId, commentId) {
	
		var temp = Posts.findOne( {_id: postId} ).comments;
		temp.push(commentId);

		Posts.update(postId, {$set: {comments: temp}});
	}
});
