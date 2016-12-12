Template.postItem.helpers({
    isOwner: function() {
        return this.owner === Meteor.userId();
    },

    isNotCompleted: function() {
        return this.completed === false;
    },

    image: function() {
        const image_id = Meteor.users.findOne({
            "_id": this.owner
        }).image;
        return Images.collection.findOne({
            "_id": image_id
        });
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

    imagesOfCompletionNotZero: function() {
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
        if (Meteor.user()) {
            return true;
        }
    },

    ownerUsername: function() {
        return Meteor.users.findOne({
            "_id": this.owner
        }).username;
    },

    imageFile: function() {
        return Images.collection.findOne({
            "_id": this.image
        });
    },

    imageCompletionFile: function() {
        return Images.collection.findOne({
            "_id": this.imagesOfCompletion[0]
        });
    },

    profilePicture: function() {
        return Meteor.users.findOne({
            "_id": this.owner
        }).image;
    },

    checkCompleted: function() {
        return this.completed === true;
    },

    checkLike: function() {
        const a = this.likes;
        const user = Meteor.userId();
        for (var i = 0; i < a.length; i++) {
            if (a[i] === user) {
                return false;
            }
        }
        return true;
    },

    hasTags: function() {
        if (this.tags !== '') {
            return true;
        }
    },

    dateFromNow: function() {
        return moment(this.date).fromNow();
    },

    shareData: function() {
        const id = Posts.findOne({
            "_id": this._id
        })._id;
        const site = "http://thegradlist.herokuapp.com/posts/";
        const path = site.concat(id);
        return {
            url: path,
            title: this.title,
            author: Meteor.users.findOne({
                "_id": this.owner
            }).username
        };
    },

    title: function() {
        return this.title;
    },

    shareUrl: function() {
        return "http://thegradlist.herokuapp.com/posts/" + this._id;
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
        if (Meteor.user().tutorial === true) {
            Meteor.call("deletePost", this._id);
        }
        else {
            sAlert.error('You are not allowed to do this yet!', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: '3000',
                onRouteClose: false,
                stack: false,
                offset: '80px',
            });
        }
    },

    'click .fork': function() {
        sAlert.error('Fork Success', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: '3000',
            onRouteClose: false,
            stack: false,
            offset: '80px',
        });
        Meteor.call("forkPost", this._id);
    },

    'click .complete': function() {
        if (Meteor.user().tutorial === true) {
            let url = "/completed/";
            Router.go(url.concat(this._id));
        }
        else {
            sAlert.error('You are not allowed to do this yet!', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: '3000',
                onRouteClose: false,
                stack: false,
                offset: '80px',
            });
        }
    },

    'submit .newComment': function(event) {
        event.preventDefault();
        const text = event.target.comment.value;
        const commentId = Comments.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId()
        });
        Meteor.call("addCommentToPost", this._id, commentId);
        event.target.comment.value = "";
    }
});

SocialButtons.config({
    via: '@thegradlist',
});
