import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';

import './post_submit.html';

Template.postSubmit.events({
    'submit form': function(e) {
        const string = $(e.target).find('[name=title]').val();
        let matches = "";
        if (/\S/.test(string)) {
            if ($(e.target).find('[name=tags]').val() !== '') {
                const raw = ($(e.target).find('[name=tags]').val());
                matches = raw.match(/[^\s#,;]+/gi);
            } else {
                matches = '';
            }
            const post = {
                title: $(e.target).find('[name=title]').val(),
                owner: Meteor.userId(),
                username: Meteor.user().username,
                comments: [],
                date: new Date(),
                completed: false,
                imagesOfCompletion: [],
                witnessedBy: [],
                dateOfCompletion: {},
                likes: [],
                tags: matches,
                image: Session.get("picture")
            };
            post._id = Posts.insert(post);
            const tags = matches;
            for (i = 0; i < tags.length; i++) {
                const TagExist = Tags.find({
                    title: tags[i]
                }, {
                    limit: 1
                }).count() > 0;
                if (TagExist === false) {
                    const tag = {
                        title: tags[i],
                        number: 0
                    };
                    tag._id = Tags.insert(tag);
                } else {
                    const tag_name = tags[i];
                    Meteor.call("increment_tag", tag_name);
                }
            }
            if (Meteor.user().tutorial !== true) { // In case user is in the Tutorial
                event.preventDefault();
                sAlert.error('Nice! Go on', {
                    effect: 'slide',
                    position: 'bottom-right',
                    timeout: 'none',
                    onRouteClose: false,
                    stack: false,
                    offset: '80px'
                });
            }
        } else {
            event.preventDefault();
            sAlert.error('Post title must contain at least one alphanumeric character', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 'none',
                onRouteClose: false,
                stack: false,
                offset: '80px'
            });
        }
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
                    Session.set("picture", fileObj._id);
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
        Session.set("uploadStatus", "uploaded");
    }
});

Template.postSubmit.helpers({
    currentUpload: function() {
        return Template.instance().currentUpload.get();
    },

    fileIsUploaded: function() {
        if (Session.get("uploadStatus") == "uploaded") {
            return true;
        }
        return false;
    },

    fileSrc: function() {
        return Images.collection.findOne({
            "_id": Session.get("picture")
        });
    }
});

Template.postSubmit.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
});
