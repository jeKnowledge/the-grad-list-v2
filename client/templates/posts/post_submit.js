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
      imagesOfCompletion:[],
      witnessedBy: [],
      dateOfCompletion: {},
      likes: [],
      tags: (($(e.target).find('[name=tags]').val()).replace(/\s/g, '')).split('#'),
			image: Session.get("picture"),

    };
    post._id = Posts.insert(post);
    Router.go('postPage', post);
    },

	'change .myFileInput': function(event, template) {
    var fsFile = new FS.File(event.target.files[0]);
    fsFile.owner = Meteor.userId();
    Images.insert(fsFile, function (err) {
      if (err) throw err;
			var url = "/cfs/files/images/" + fsFile._id;
			Session.set("picture", url);
    });
  }
});
