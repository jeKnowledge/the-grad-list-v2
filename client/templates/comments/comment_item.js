Template.commentItem.helpers({
  ownerUsername: function() {
    return Meteor.users.findOne({
      "_id": this.owner
    }).username || Meteor.users.findOne({
      "_id": this.owner
    }).profile.name;
  },

  owner: function() {
    return Meteor.userId() === this.owner;
  }
});

Template.commentItem.events({
  'click .delete2': function() {
    Meteor.call("deleteComment", this._id);
  },

});
