let step3 = false;
let step4 = false;

Template.userPosts.helpers({
    userExists: function() {
        var result = Meteor.users.findOne({
            username: this.username
        }, {
            fields: {
                "_id": 1
            }
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    },

    owner: function() {
        return Meteor.users.findOne({
            "_id": this._id
        })._id !== Meteor.userId();
    },

    checkFollowing: function() {
        var a = Meteor.users.findOne({
            "_id": this._id
        }).followed;
        var obj = Meteor.userId();
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return false;
            }
        }
        return true;
    },

    postsByUser: function() {
        return Posts.find({
            owner: this._id
        }, {
            sort: {
                date: -1
            }
        });
    },

    image: function() {
        var image_id = Meteor.users.findOne({
            "_id": this._id
        }).image;
        return Images.collection.findOne({
            "_id": image_id
        });
    },

    hasProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).image == 'grad.png') {
            return false;
        } else {
            return true;
        }
    },

    srcProfilePicture: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).facebook_login === false) {
            return "/grad.png";
        } else {
            return "http://graph.facebook.com/" + Meteor.users.findOne({
                "_id": this._id
            }).services.facebook.id + "/picture/?type=large";
        }
    },

    getUsername: function() {
        return Meteor.users.findOne({
            "_id": this._id
        }).username;
    },

    following: function() {
        return Meteor.users.findOne({
            "_id": this._id
        }).follows.length;
    },

    followers: function() {
        return Meteor.users.findOne({
            "_id": this._id
        }).followed.length;
    },

    bio: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).bio != '[object Object]')
            return Meteor.users.findOne({
                "_id": this._id
            }).bio;
        else {
            return '';
        }
    },

    university: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).university != '[object Object]')
            return Meteor.users.findOne({
                "_id": this._id
            }).university;
        else {
            return '';
        }
    },

    country: function() {
        if (Meteor.users.findOne({
                "_id": this._id
            }).country != '[object Object]')
            return Meteor.users.findOne({
                "_id": this._id
            }).country;
        else {
            return '';
        }
    },

    checkFirstTimeLoggingIn: function() {
        if (Meteor.users.findOne({
                "_id": Meteor.userId()
            }).tutorial === false) {
            Session.set("step4", true);
            Session.set("step3", false);
            sAlert.error('This is your profile. Here you can see your posts and edit your profile. Go to My Book now', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: '10000',
                onRouteClose: false,
                stack: false,
                offset: '80px',
            });
        }
    },
});

Template.userPosts.events({
    'click #follow': function() {
        Meteor.call("followId", this._id);
    },
    'click #unfollow': function() {
        Meteor.call("unfollowId", this._id);
    }
});
