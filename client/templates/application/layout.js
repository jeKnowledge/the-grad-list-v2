Template.layout.helpers({
    checkFirstTimeLoggingIn: function() {
        return Meteor.users.findOne({
            "_id": Meteor.userId()
        }).tutorial;
    },
});
