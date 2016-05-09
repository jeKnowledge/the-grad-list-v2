Template.postItem.helpers({

    isCurrentUser: function() {
        return Meteor.userId() == this.owner;
    },

    isOwner: function() {
        return this.owner === Meteor.userId();
    },

    isNotCompleted: function() {
        return this.completed === false;
    },

    images_of_completion_different_from_zero: function() {
      if (parseInt(this.imagesOfCompletion) !== 0) {
        return true;
      }
    },

    isForked: function() {
        return this.hasOwnProperty("forkedFrom");
    },

    forkedFrom: function() {
        return this.forkedFrom;
    },

    isLoggedIn: function() {
        var user = Meteor.user();
        if (user) {
            return true;
        }
    },

    isNotOwner: function() {
        return this.owner !== Meteor.userId();
    },

    ownerUsername: function() {
        return Meteor.users.findOne({"_id": this.owner}).username;
    },

    profilePicture: function() {
        return Meteor.users.findOne({"_id": this.owner}).image;
    },

    checkCompleted: function() {
        return this.completed === true;
    },

    checkLike: function() {
        var a = this.likes;
        var obj = Meteor.userId();
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return false;
            }
        }
        return true;
    },

    has_tags: function() {
      if (this.tags !== '') {
        return true;
      }
    },

    date_from_now: function() {
      return moment(this.date).fromNow();
    }
});

Template.postItem.events({

    'click .like': function() {
        Meteor.call("likePost", this._id);
    },

    'click .dislike': function() {
        Meteor.call("dislikePost", this._id);
    },

    'click .delete': function() {
        Meteor.call("deletePost", this._id);
    },

    'click .fork': function() {
        Meteor.call("forkPost", this._id);
    },

    'submit .new-comment': function(event) {
        event.preventDefault();

        var text = event.target.comment.value;

        var commentId = Comments.insert({text: text, createdAt: new Date(), owner: Meteor.userId()});

        Meteor.call("addCommentToPost", this._id, commentId);

        event.target.comment.value = "";
    }
});
