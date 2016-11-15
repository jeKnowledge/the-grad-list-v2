Template.tutorial.events({
    'click #complete-tutorial': function(event) {
        Meteor.call("completeTutorial");
    },
});
