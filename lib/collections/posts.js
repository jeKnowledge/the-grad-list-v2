Posts = new Mongo.Collection("posts");

Posts.allow({
	insert: function(userId, doc) {
		//only allow posting a user that is logged in
		return userId;
	},
	update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
});
