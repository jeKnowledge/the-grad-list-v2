Template.tags.helpers({
    postsByTags: function() {
      return Posts.find({tags: this.tags });
    },
});
