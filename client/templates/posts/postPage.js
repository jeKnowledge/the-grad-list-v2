Template.postPage.helpers({
  comments: function() {
    return Comments.find({
      _id: {
        $in: this.comments
      }
    });
  }
});
