Template.following.helpers({
    username: function() {
        return Meteor.users.findOne({"_id": this._id}).username;
    },

    image: function() {
        var image_id = Meteor.users.findOne({"_id": this._id}).image;
        return Images.collection.findOne({"_id": image_id});
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
