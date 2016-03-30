Template.tags.helpers({
    postsByTags: function() {
      var url = Router.current().location.get().path.slice(6);
      return Posts.find({tags: url });
    },
});
