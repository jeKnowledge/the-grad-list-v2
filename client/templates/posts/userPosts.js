Template.userPosts.helpers({
    postsByUser: function() {
        return Posts.find({owner: this._id}, {sort: {date: -1}});
    },
  
    getUsername: function() {
        return Meteor.users.findOne({"_id": this._id}).username || Meteor.users.findOne({"_id": this._id}).profile.name;
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
    }
});
