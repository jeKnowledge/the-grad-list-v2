Template.home.helpers({
    suggestions: function() {
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
      if (friendsOfFriendsRes.length !== 0) {
        return friendsOfFriendsRes;
      }
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

    hasProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).image == 'grad.png') {
            return false;
        } else {
            return true;
        }
    },

    srcProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).facebook_login === false) {
            return "/grad.png";
        } else {
            return "http://graph.facebook.com/" + Meteor.users.findOne({
                "_id": this._id
            }).services.facebook.id + "/picture/?type=large";
        }
    },

    image: function() {
        const image_id = Meteor.users.findOne({
            "_id": this._id
        }).image;
        return Images.collection.findOne({
            "_id": image_id
        });
    },
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
