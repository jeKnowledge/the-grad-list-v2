Template.feed.helpers({
    postsByFollows: function() {
        return Posts.find({
            $or: [
                {
                    owner: Meteor.userId()
                }, {
                    owner: {
                        $in: Meteor.user().follows
                    }
                }
            ]
        }, {
            sort: {
                date: -1
            }
        });
    }
});
