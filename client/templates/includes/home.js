Template.home.helpers({

    userHasNoFollowers: function() {
        if (Meteor.user().follows.length === 0) {
            return true;
        }
    },

    randomUsers: function() {
        return Meteor.users.find({
            $and: [{
                "_id": {
                    $nin: Meteor.user().follows
                }
            }, {
                "_id": {
                    $ne: Meteor.userId()
                }
            }]
        }, {
            "limit": 3
        });
    },

    friendsOfFriends: function() {
        const friends = Meteor.user().follows;
        const friendsOfFriendsRes = [];
        for (let i = 0; i < friends.length; i++) {
            const friend = Meteor.users.findOne({
                "_id": friends[i]
            });
            const friendFollowing = friend.follows;
            for (let j = 0; j < friendFollowing.length; j++) {
                const friendOfFriend = Meteor.users.findOne({
                    "_id": friendFollowing[j]
                });
                if (notContains(friendsOfFriendsRes, friendOfFriend) && notContainsArray(friends, friendOfFriend) && friendOfFriend._id != Meteor.user()._id) {
                    friendsOfFriendsRes.push(friendOfFriend);
                }
            }
        }
        return friendsOfFriendsRes;
    }
});

function notContains(a, obj) {
    for (let i = 0; i < a.length; i++) {
        if (obj._id == a[i]._id) {
            return false;
        }
    }
    return true;
}

function notContainsArray(a, obj) {
    for (let i = 0; i < a.length; i++) {
        if (obj._id == a[i]) {
            return false;
        }
    }
    return true;
}
