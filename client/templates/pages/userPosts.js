Template.userPosts.helpers({
    owner: function() {
        return Meteor.users.findOne({"_id": this._id})._id !== Meteor.userId();
    },

    checkFollowing: function() {
        var a = Meteor.users.findOne({"_id": this._id}).followed;
        var obj = Meteor.userId();
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return false;
            }
        }
        return true;
    },

    postsByUser: function() {
        return Posts.find({owner: this._id}, {sort: {date: -1}});
    },
  
    getUsername: function() {
        return Meteor.users.findOne({"_id": this._id}).username;
    },

    following: function() {
    	return Meteor.users.findOne({"_id": this._id}).follows.length;
    },

    followers: function() {
        return Meteor.users.findOne({"_id": this._id}).followed.length;
    }
});

Template.userPosts.events({
    'click #follow': function() {
        Meteor.call("followId", this._id);
    },
    'click #unfollow': function() {
        Meteor.call("unfollowId", this._id);
    }
});
