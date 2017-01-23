Template.commentItem.helpers({
    ownerUsername: function() {
        return Meteor.users.findOne({"_id": this.owner}).username || Meteor.users.findOne({"_id": this.owner}).profile.name;
    },

    owner: function() {
        return Meteor.userId() === this.owner;
    },

    hasProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this.owner
            }).image == 'grad.png') {
            return false;
        } else {
            return true;
        }
    },

    srcProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this.owner
            }).facebook_login === false) {
            return "/grad.png";
        } else {
            return "http://graph.facebook.com/" + Meteor.users.findOne({
                "_id": this.owner
            }).services.facebook.id + "/picture/?type=large";
        }
    },
});

Template.commentItem.events({
    'click .delete2': function() {
        Meteor.call("deleteComment", this._id);
    }
});
