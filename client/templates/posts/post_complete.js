Template.postComplete.helpers({
  getTitle: function() {
    return this.title;
  }
});

Template.postComplete.events({
  'submit form': function(e) {
    e.preventDefault();
    Posts.update({
      _id: this._id
    }, {
      $set: {
        completed: true,
        date: new Date()
      },
      $push: {
        imagesOfCompletion: $(e.target).find('[name=image1]').val()
      }
    });
    Meteor.call("medals");
    Router.go("/");
  }
});
