Template.tags.helpers({
    postsByTags: function() {
      console.log("hljbjlhlj");
    	console.log(this.tags);
      return Posts.find({tags: { $regex: this.tags }});
    },
});
