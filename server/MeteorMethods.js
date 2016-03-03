Meteor.methods({
	loginFacebook: function() {
		Meteor.users.update(Meteor.userId(), {$set: {username: Meteor.user().services.facebook.name}});
	},

	defaultPicture: function() {
		Meteor.users.update(Meteor.userId(), {$set: {image: "https://camo.githubusercontent.com/d818d23678800c7755a49d7f5b26ad0d6cb0aea7/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f343932303733362f3733363937342f65323534356335322d653332352d313165322d383030302d3864646163393762653831352e706e67"}});
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

  dislikePost: function(id) {
  	Posts.update(Posts.findOne({_id: id}), {$pull: {likes: Meteor.userId()} });
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
	},

	editProfile: function(s_bio, s_country, s_university, s_pic) {
		Meteor.users.update(Meteor.userId(),
    	{$set: { bio: s_bio,
    	country: s_country,
    	university: s_university }}
		);
	},

	add_image: function(id) {
    Meteor.users.update(Meteor.userId(), {$set: {image: "/cfs/files/images/" + id}});
  },

	medals: function() {
		Meteor.users.update({"_id": Meteor.userId()}, {$inc: {medals: 1}});
	}
});
