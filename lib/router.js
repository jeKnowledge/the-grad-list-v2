Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	waitOn: function()
	{
		return Meteor.subscribe("posts") && Meteor.subscribe("usersData");
	},
	notFoundTemplate: "notFound"
});

Router.route('/', {name: 'postsList'});

//The :_id is a parameter passed to the route and can be retrived by this.params. 
Router.route("/posts/:_id",  {
	name: "postPage",
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route("/user/:username", { 
  name: "userPosts", 
  data: function() {
    return Meteor.users.findOne({username: this.params.username});
  }
});

Router.route("/submit", {name: "postSubmit"});

Router.route("/feed", {name: "feed"});


var requireLogin = function() { 
	if (!Meteor.user())
	{
		if (Meteor.loggingIn())
		{
			this.render(this.loadingemplate);
		}
		else
		{
			this.render("accessDenied");
		}
	}
	else
	{
		this.next();
	}
}

Router.onBeforeAction("dataNotFound", {only: "postPage"});
Router.onBeforeAction(requireLogin, {only: "postSubmit"});