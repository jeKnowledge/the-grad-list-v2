Template.main.helpers({
    checkFirstTimeLoggingIn: function() {
        return Meteor.users.findOne({
            "_id": Meteor.userId()
        }).tutorial;
    },
});
