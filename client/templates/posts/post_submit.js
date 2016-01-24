Template.postSubmit.events({
	'submit form': function(e) {
            e.preventDefault();
        var post = {
    		title: $(e.target).find('[name=title]').val(),
    		image: $(e.target).find('[name=image]').val(),
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
            };
            post._id = Posts.insert(post);
            Router.go('postPage', post);
        }
});

