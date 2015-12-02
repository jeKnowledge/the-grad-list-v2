Template.commentItem.helpers({
    ownerUsername: function() {
        return Meteor.users.findOne({"_id": this.owner}).username || Meteor.users.findOne({"_id": this.owner}).profile.name;
    }
}); 