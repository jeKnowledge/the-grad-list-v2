Template.layout.helpers({
    checkFirstTimeLoggingIn: function() {
        return Meteor.user().tutorial;
    },
});
