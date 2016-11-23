let step1 = false;
let step2 = false;
let step3 = false;

Template.tutorial.events({
    'click #complete-tutorial': function(event) {
        console.log("io");
        Meteor.call("completeTutorial");
    },

    'click #step1': function(event) {
        Session.set("step1", true);
    },

    'click #step2': function(event) {
        let check = userHasPosts();
        if (check === true) {
            Session.set("step2", true);
            Session.set("step1", false);
        }
        else {
            // If user doesn't submit post, automatically skips 'share' step
            Session.set("step3", true);
            Session.set("step1", false);
        }
    },
});

Template.tutorial.helpers({
    step1: function() {
        return Session.get("step1");
    },

    step2: function() {
        return Session.get("step2");
    },

    step3: function() {
        return Session.get("step3");
    },

    posts: function() {
        return Posts.find({
            owner: Meteor.userId()
        });
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
    console.log(check);
    return check;
}
