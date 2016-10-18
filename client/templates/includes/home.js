Template.home.helpers({
    user: function() {
        return Meteor.users.find({
            $and: [
                {
                    "_id": {
                        $nin: Meteor.user().follows
                    }
                }, {
                    "_id": {
                        $ne: Meteor.userId()
                    }
                }
            ]
        }, {"limit": 3});
    },

    checkFollowers: function() {
        if (Meteor.user().follows.length === 0) {
            return true;
        }
    },

    friendsOfFriends: function() {
        var friends = Meteor.user().follows;
        var friendsOfFriends = [];
        for (var i = 0; i < friends.length; i++) {
            friendsOfFriends.push(Meteor.users.findOne({"_id": friends[i]}).follows);
        }
        function notcontains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return false;
                }
            }
            return true;
        }
        var a = [];
        for (var p = 0; p < friendsOfFriends.length; p++) {
            for (var j = 0; j < friendsOfFriends[p].length; j++) {
                if (friendsOfFriends[p][j] != Meteor.userId() && notcontains(friendsOfFriends, friendsOfFriends[p][j]) && notcontains(Meteor.user().follows, friendsOfFriends[p][j])) {
                    a.push(Meteor.users.findOne({"_id": friendsOfFriends[p][j]
                    }));
                }
            }
        }
        return a.slice(0, 3);
    }
});
