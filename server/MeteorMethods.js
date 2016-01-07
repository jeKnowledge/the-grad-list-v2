Meteor.methods({
	loginFacebook: function() {
		Meteor.users.update(Meteor.userId(), {$set: {username: Meteor.user().services.facebook.name}});
	},

	deletePost: function(id) {
		if (Meteor.userId() == Posts.findOne({_id: id}).owner)
			Posts.remove(id);			
	},

	deleteComment: function(id) {
		if (Meteor.userId() == Comments.findOne({_id: id}).owner)
			Comments.remove(id);
	},
	
	forkPost: function(id) {
		var post2 = {
			title: Posts.findOne({_id:id}).title,
			owner: Meteor.userId(),
			forkedFrom: Posts.findOne({_id:id}).username,
			date: new Date(),
			username: Meteor.user().username,
			image: Posts.findOne({_id:id}).image,
            completed: false,
            };
		post2._id = Posts.insert(post2);
        },

    likePost: function(id) {
    	Posts.update(Posts.findOne({_id: id}), {$addToSet: {likes: Meteor.userId()} });
    },

    followId: function(id) {
            
            Meteor.users.update(Meteor.userId(), {$addToSet: {follows: id}});
            Meteor.users.update(Meteor.users.findOne({"_id": id}), {$addToSet: {followed: Meteor.userId()}});
            /*Meteor.users.findOne({_id: Meteor.userId() }).follows.push(id);
            console.log(id +" " + Meteor.userId());*/
    },

    unfollowId: function(id) {
            
            Meteor.users.update(Meteor.userId(), {$pull: {follows: id}});
            Meteor.users.update(Meteor.users.findOne({"_id": id}), {$pull: {followed: Meteor.userId()}});
            /*Meteor.users.findOne({_id: Meteor.userId() }).follows.push(id);
            console.log(id +" " + Meteor.userId());*/
    },
	
	addCommentToPost: function(postId, commentId) {
	
		var temp = Posts.findOne( {_id: postId} ).comments;
		temp.push(commentId);

		Posts.update(postId, {$set: {comments: temp}});
	}
});
