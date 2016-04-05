Comments = new Mongo.Collection("comments");

Comments.allow({
  insert: function(userId, doc) {
    //only allow posting a user that is logged in
    return userId;
  }
});
