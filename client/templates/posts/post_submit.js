Template.postSubmit.events({
	'submit form': function(e) {
	e.preventDefault();
	var post = {
		title: $(e.target).find('[name=title]').val(),
		owner: Meteor.userId(),
		username: Meteor.user().username || Meteor.user().profile.name,
		date: new Date()
	};
	post._id = Posts.insert(post);
	Router.go('postPage', post);
	}
});

