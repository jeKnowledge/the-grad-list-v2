Posts = new Mongo.Collection("posts");

Posts.allow({
	insert: function(userId, doc) { 
		//only allow posting a user that is logged in
		return userId;
	}
})