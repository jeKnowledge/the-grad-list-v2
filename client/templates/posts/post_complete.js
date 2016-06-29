import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './post_complete.html';

Template.postComplete.helpers({
    getTitle: function() {
        return this.title;
    },

    currentUpload: function() {
        return Template.instance().currentUpload.get();
    }
});

Template.postComplete.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
});

Template.postComplete.events({
    'submit form': function(e) {
        e.preventDefault();
        Posts.update({
            _id: this._id
        }, {
            $set: {
                completed: true,
                date: new Date()
            },
            $push: {
                imagesOfCompletion: Session.get("picture") || 0
            }
        });
        Meteor.call("medals");
        Router.go("/");
    },

    'change .myFileInput': function(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // multiple files were selected
            var upload = Images.insert({
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
                    Session.set("picture", fileObj._id);
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    }

});
