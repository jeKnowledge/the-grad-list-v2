let step1 = false;
let step2 = false;
let step3 = false;
let step4 = false;

Template.tutorial.events({
    'click #step1': function(event) {
        Session.setPersistent("step1", true);
    },

    'click #step2': function(event) {
        let check = userHasPosts();
        if (check === true) {
            Session.setPersistent("step2", true);
            Session.setPersistent("step1", false);
        }
        else {
            // If user doesn't submit post, automatically skips 'share' step
            Session.setPersistent("step3", true);
            Session.setPersistent("step1", false);
        }
    },

    'click #step2-left': function(event) {
        Session.setPersistent("step2", false);
        Session.setPersistent("step1", false);
    },

    'click #step3': function(event) {
        Session.setPersistent("step3", true);
        Session.setPersistent("step2", false);
    },

    'click #step3-left': function(event) {
        Session.setPersistent("step1", true);
        Session.setPersistent("step2", false);
    },

    'click #step4': function(event) {
        Session.setPersistent("step4", true);
        Session.setPersistent("step3", false);
    },

    'click #step4-left': function(event) {
        Session.setPersistent("step2", true);
        Session.setPersistent("step3", false);
    },

    'click #step4-left-special': function(event) {
        Session.setPersistent("step1", true);
        Session.setPersistent("step2", false);
        Session.setPersistent("step3", false);
    },
});

Template.tutorial.helpers({
    examplePosts: function() {
        return Posts.find({}, {
            limit: 3
        });
    },

    step1: function() {
        return Session.get("step1");
    },

    step2: function() {
        return Session.get("step2");
    },

    step3: function() {
        return Session.get("step3");
    },

    step4: function() {
        return Session.get("step4");
    },

    posts: function() {
        return Posts.find({
            owner: Meteor.userId()
        });
    },

    hasMadePost: function() {
        return userHasPosts();
    },
});

function userHasPosts() {
    let check = false;
    var posts = Posts.find();
    _.forEach(posts.fetch(), function(item) {
        if (item.owner == Meteor.users.findOne({
                "_id": Meteor.userId()
            })._id) {
            check = true;
        }
    });
    return check;
}
