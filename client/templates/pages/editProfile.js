import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './editProfile.html';

Template.editProfile.events({
    'submit form': function(e) {
        e.preventDefault();
        const bio = $(e.target).find('[name=bio]').val();
        const country = $(e.target).find('[name=country]').val();
        const university = $(e.target).find('[name=university]').val();
        const username = $(e.target).find('[name=username]').val();
        const pass = $(e.target).find('[name=password]').val();
        const confirmPass = $(e.target).find('[name=confirm-password]').val();
        if (pass != confirmPass) {
            sAlert.error('Passwords do not match', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: '3000',
                onRouteClose: false,
                stack: false,
                offset: '80px'
            });
        }
        Meteor.call('doesUserExist', username, function(error, result) {
            if (result === true && username != Session.get("user")) {
                sAlert.error('Username already exists', {
                    effect: 'slide',
                    position: 'bottom-right',
                    timeout: '3000',
                    onRouteClose: false,
                    stack: false,
                    offset: '80px'
                });
            }
            else {
                if (pass == confirmPass) {
                  Meteor.call("editProfile", bio, country, university, username, pass);
                  Router.go("/");
                }
              }
        });
    },

    'change .myFileInput': function(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // multiple files were selected
            const upload = Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function() {
                template.currentUpload.set(this);
            });

            upload.on('end', function(error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    Meteor.call("add_image", fileObj._id);
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    }
});

Template.editProfile.helpers({
    image: function() {
      var image_id = Meteor.user().image;
      return Images.collection.findOne({
          "_id": image_id
      });
    },

    hasProfilePicture: function() {
        if (Meteor.user().image == 'grad.png') {
            return false;
        } else {
            return true;
        }
    },

    srcProfilePicture: function() {
        if (Meteor.user().facebook_login === false) {
            return "/grad.png";
        } else {
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
        }
    },

    bio: function() {
      return Meteor.user().bio;
    },

    university: function() {
      return Meteor.user().university;
    },

    country: function() {
      return Meteor.user().country;
    },

    currentUpload: function() {
        return Template.instance().currentUpload.get();
    },

    notFacebookLogin: function() {
        if (Meteor.user().facebook_login === false) {
            return true;
        } else {
            return false;
        }
    },

    username: function() {
      Session.set("user", Meteor.user().username);
      return Meteor.user().username;
    }
});

Template.editProfile.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
});
