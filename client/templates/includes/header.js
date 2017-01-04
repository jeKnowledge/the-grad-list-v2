Template.header.helpers({
    userID: function() {
        return Meteor.userId();
    },

    getUsername: function() {
        return Meteor.user().username;
    },

    indexes: function() {
        return [UsersIndex, TagsIndex];
    },

    usersIndex: function() {
        return UsersIndex;
    },

    tagsIndex: function() {
        return TagsIndex;
    },

    inputAttributes: function() {
        return {
            placeholder: "Search",
            class: 'form-control'
        };
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
    }
});

Template.header.events({
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
        document.location.reload(true);
    }
});
