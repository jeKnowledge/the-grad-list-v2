Template.following.helpers({
    name: function() {
        return Meteor.users.findOne({"_id": this._id}).username;
    },

    image: function() {
        const image_id = Meteor.users.findOne({"_id": this._id}).image;
        const raw = "cdn/storage/Images/" + image_id + "/original/" + image_id + ".png";
        return "/../" + raw;
    },

    following: function() {
        let a = [];
        const following = Meteor.users.findOne({"_id": this._id}).follows;
        for (var i = 0; i < following.length; i++) {
            a.push(Meteor.users.findOne({"_id": following[i]}));
        }
        return a;
    }
});
