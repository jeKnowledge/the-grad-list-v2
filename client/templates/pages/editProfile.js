import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './editProfile.html';

Template.editProfile.events({
    'submit form': function(e) {
        e.preventDefault();
        const s_bio = $(e.target).find('[name=bio]').val();
        const s_country = $(e.target).find('[name=country]').val();
        const s_university = $(e.target).find('[name=university]').val();
        Meteor.call("editProfile", s_bio, s_country, s_university);
        Router.go("/");
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
    currentUpload: function() {
        return Template.instance().currentUpload.get();
    },

    notFacebookLogin: function() {
        if (Meteor.user().facebook_image === false) {
            return true;
        } else {
            return false;
        }
    }
});

Template.editProfile.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
});
