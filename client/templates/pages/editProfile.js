Template.editProfile.events({
	'submit form': function(e) {
        e.preventDefault();
        var s_bio = $(e.target).find('[name=bio]').val();
        var s_country = $(e.target).find('[name=country]').val();
        var s_university = $(e.target).find('[name=university]').val();
        Meteor.call("editProfile", s_bio, s_country, s_university);
        Router.go("/");
    },

		'change .myFileInput': function(event, template) {
      var fsFile = new FS.File(event.target.files[0]);
      fsFile.owner = Meteor.userId();
      Images.insert(fsFile, function (err) {
        if (err) throw err;
        Meteor.call("add_image", fsFile._id);
      });
    }
});
