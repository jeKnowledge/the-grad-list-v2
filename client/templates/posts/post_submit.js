Template.postSubmit.events({
    'submit form': function(e) {
        var string = $(e.target).find('[name=title]').val();
        var matches = "";
        if (/\S/.test(string)) {
            var tags_2;
            if ($(e.target).find('[name=tags]').val() !== '') {
                var raw = ($(e.target).find('[name=tags]').val());
                matches = raw.match(/[^\s#,;]+/gi);
                tags_2 = matches;
            } else {
                tags_2 = '';
            }
            var post = {
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
                tags: tags_2,
                image: Session.get("picture")
            };
            post._id = Posts.insert(post);
            var tags = matches;
            for (i = 0; i < tags.length; i++) {
                var TagExist = Tags.find({
                    title: tags[i]
                }, {limit: 1}).count() > 0;
                if (TagExist === false) {
                    var tag = {
                        title: tags[i],
                        number: 0
                    };
                    tag._id = Tags.insert(tag);
                } else {
                    var tag_name = tags[i];
                    Meteor.call("increment_tag", tag_name);
                }
            }
            Router.go('postPage', post);
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

    'change .myFileInput': function(event, template) {
        var fsFile = new FS.File(event.target.files[0]);
        fsFile.owner = Meteor.userId();
        Images.insert(fsFile, function(err) {
            if (err)
                throw err;
            var url = "/cfs/files/images/" + fsFile._id;
            Session.set("picture", url);
        });
    }
});
