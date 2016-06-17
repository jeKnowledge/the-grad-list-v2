Template.following.helpers({
    name: function() {
        return Meteor.users.findOne({"_id": this._id}).username;
    },

    image: function() {
        var image_id = Meteor.users.findOne({"_id": this._id}).image;
        var raw = "cdn/storage/Images/" + image_id + "/original/" + image_id + ".png";
        return "/../" + raw;
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
