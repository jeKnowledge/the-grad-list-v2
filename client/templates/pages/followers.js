Template.followers.helpers({
  username: function() {
    return Meteor.users.findOne({
      "_id": this._id
    }).username;
  },

  followers: function() {
    var a = [];
    var followers = Meteor.users.findOne({"_id": this._id}).followed;
    for (var i = 0; i < followers.length; i++) {
      a.push(Meteor.users.findOne({"_id": followers[i]}));
    }
    return a;
  }
});
