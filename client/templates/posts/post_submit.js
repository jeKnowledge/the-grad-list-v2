Template.postSubmit.events({
  'submit form': function(e) {
    var post = {
      title: $(e.target).find('[name=title]').val(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      comments: [],
      date2: new Date().toDateString(),
      date: new Date(),
      completed: false,
      imagesOfCompletion: [],
      witnessedBy: [],
      dateOfCompletion: {},
      likes: [],
      tags: (($(e.target).find('[name=tags]').val())).replace(/ /g, '').replace(/,/g, '#').substr(1).split('#'),
      image: Session.get("picture"),
    };
    post._id = Posts.insert(post);
    var tags = (($(e.target).find('[name=tags]').val())).replace(/ /g, '').replace(/,/g, '#').substr(1).split('#');
    for (i = 0; i < tags.length; i++) {
      var tag = {
        title: tags[i],
      };
      tag._id = Tags.insert(tag);
    }
    Router.go('postPage', post);
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
