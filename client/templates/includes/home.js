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
        var friends = Meteor.user().follows;
        var friendsOfFriendsRes = [];
        for (var i = 0; i < friends.length; i++) {
            var friend = Meteor.users.findOne({
                "_id": friends[i]
            });
            var friendFollowing = friend.follows;
            for (var j = 0; j < friendFollowing.length; j++) {
                var friendOfFriend = Meteor.users.findOne({
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
    for (var i = 0; i < a.length; i++) {
        if (obj._id == a[i]._id) {
            return false;
        }
    }
    return true;
}

function notContainsArray(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (obj._id == a[i]) {
            return false;
        }
    }
    return true;
}
