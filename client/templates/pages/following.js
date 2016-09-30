Template.following.helpers({
    name: function() {
        return Meteor.users.findOne({"_id": this._id}).username;
    },

    image: function() {
        var image_id = Meteor.users.findOne({"_id": this._id}).image;
        return Images.collection.findOne({"_id": image_id});
    },

    hasProfilePicture: function() {
        if (Meteor.users.findOne({"_id": this._id}).image == 'grad.png') {
            return false;
        } else {
            return true;
        }
    },

    srcProfilePicture: function() {
        if (Meteor.users.findOne({"_id": this._id}).facebook_image === false) {
            return "/grad.png";
        } else {
            return "http://graph.facebook.com/" + Meteor.users.findOne({"_id": this._id}).services.facebook.id + "/picture/?type=large";
        }
    },

    following: function() {
        var a = [];
        var following = Meteor.users.findOne({"_id": this._id}).follows;
        for (var i = 0; i < following.length; i++) {
            a.push(Meteor.users.findOne({"_id": following[i]}));
        }
        return a;
    }
});
