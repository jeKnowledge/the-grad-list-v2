Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading",
    waitOn: function() {
        return Meteor.subscribe("posts") && Meteor.subscribe("usersData") && Meteor.subscribe("comments") && Meteor.subscribe("tags") && Meteor.subscribe("files.images.all");
    },
    notFoundTemplate: "notFound"
});

Router.route('/', {
    name: 'main',
    layoutTemplate: ''
});

Router.onBeforeAction(function() {
    if (Meteor.userId()) {
        this.layout("layout");
    }
    else {
        this.layout("authentication");
    }
    this.next();
});

Router.route("/posts/:_id", {
    name: "postPage",
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route("/tags/:tags", {
    name: "tags",
    data: function() {
        return Posts.find({});
    }
});

Router.route("/user/:username", {
    name: "userPosts",
    data: function() {
        return Meteor.users.findOne({
            username: this.params.username
        });
    }
});

Router.route("/user/:username/followers", {
    name: "followers",
    data: function() {
        return Meteor.users.findOne({
            username: this.params.username
        });
    }
});

Router.route("/user/:username/following", {
    name: "following",
    data: function() {
        return Meteor.users.findOne({
            username: this.params.username
        });
    }
});

Router.route("/completed/:_id", {
    name: "postComplete",
    data: function() {
        return Posts.findOne({
            _id: this.params._id
        });
    }
});

Router.route("/submit", {
    name: "postSubmit"
});

Router.route("/feed", {
    name: "feed"
});

Router.route("/Book/:username", {
    name: "postBook",
    data: function() {
        return Meteor.users.findOne({
            username: this.params.username
        });
    }
});

Router.route("/:username/EditProfile", {
    name: 'editProfile'
});

Router.onBeforeAction("dataNotFound", {
    only: "postPage"
});
