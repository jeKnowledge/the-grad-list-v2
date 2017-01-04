Template.postBook.helpers({
    userExists: function() {
        const result = Meteor.users.findOne({
            username: this.username
        }, {
            fields: {
                "_id": 1
            }
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    },

    checkFirstTimeLoggingIn: function() {
        let response = Meteor.users.findOne({
            "_id": Meteor.userId()
        }).tutorial;
        return response;
    },

    title: function() {
        if (Posts.find({
                $and: [
                {
                    owner: this._id
                }, {
                    completed: true
                }]
            }).count() !== 0) {
            return "Completed posts by";
        } else {
            return "No challenges were completed by";
        }
    },

    postsCompleted: function() {
        return Posts.find({
            $and: [
            {
                owner: this._id
            }, {
                completed: true
            }]
        });
    }
});

Template.postBook.events({
    'click #complete-tutorial': function(event) {
        Meteor.call("completeTutorial");
        Session.clear();
        Router.go('/');
    },
});
