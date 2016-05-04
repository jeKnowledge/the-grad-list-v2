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
        imagesOfCompletion: Session.get("picture") || 0
      }
    });
    Meteor.call("medals");
    Router.go("/");
  },

  'change .myFileInput': function(event, template) {
    var fsFile = new FS.File(event.target.files[0]);
    fsFile.owner = Meteor.userId();
    Images.insert(fsFile, function(err) {
      if (err) throw err;
      var url = "/cfs/files/images/" + fsFile._id;
      Session.set("picture", url);
    });
  }

});
