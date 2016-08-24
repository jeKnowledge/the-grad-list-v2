Meteor.methods({
    loginFacebook: function(id) {
        console.log(id);
        console.log("teste");
        Images.load("http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large", {
            fileName: Meteor.user().services.facebook.id,
            meta: {}
        });
        var facebook_image = Images.collection.findOne({name: Meteor.user().services.facebook.id})._id;
        Meteor.users.update(Meteor.userId(), {
            $set: {
                username: Meteor.user().services.facebook.name,
                image: facebook_image
            }
        });
    },
    defaultPicture: function() {
        var a = Images.collection.findOne({name: 'logo.png'})._id;
        Meteor.users.update(Meteor.userId(), {
            $set: {
                image: a
            }
        });
    },
    doesUserExist: function(name) {
        var user_exists = Meteor.users.findOne({
            username: name
        }, {
            fields: {
                "_id": 1
            }
        });
        if (user_exists) {
            return true;
        } else {
            return false;
        }
    },
    deletePost: function(id) {
        if (Meteor.userId() == Posts.findOne({"_id": id}).owner) {
            tags = Posts.findOne({"_id": id}).tags;
            for (var i = 0; i < tags.length; i++) {
                Tags.update({
                    title: tags[i]
                }, {
                    $inc: {
                        number: -1
                    }
                });
                if (Tags.findOne({title: tags[i]}).number == -1) {
                    var tags_id = Tags.findOne({title: tags[i]})._id;
                    Tags.remove(Tags.findOne({"_id": tags_id}));
                }

            }
            if (Posts.findOne({"_id": id}).completed === true) {
                Meteor.users.update(Meteor.userId(), {
                    $inc: {
                        medals: -1
                    }
                });
            }
            Posts.remove(id);
        }
    },
    deleteComment: function(id) {
        if (Meteor.userId() == Comments.findOne({_id: id}).owner) {
            Comments.remove(id);
        }
    },
    forkPost: function(id) {
        var post2 = {
            title: Posts.findOne({_id: id}).title,
            owner: Meteor.userId(),
            forkedFrom: Posts.findOne({_id: id}).username,
            date: new Date(),
            username: Meteor.user().username,
            image: Posts.findOne({_id: id}).image,
            completed: false,
            comments: [],
            likes: [],
            tags: Posts.findOne({_id: id}).tags
        };
        var tags = Posts.findOne({_id: id}).tags;
        for (var i = 0; i < tags.length; i++) {
            Tags.update({
                title: tags[i]
            }, {
                $inc: {
                    number: 1
                }
            });
        }
        post2._id = Posts.insert(post2);
    },
    likePost: function(id) {
        Posts.update(Posts.findOne({_id: id}), {
            $addToSet: {
                likes: Meteor.userId()
            }
        });
    },
    dislikePost: function(id) {
        Posts.update(Posts.findOne({_id: id}), {
            $pull: {
                likes: Meteor.userId()
            }
        });
    },
    followId: function(id) {
        Meteor.users.update(Meteor.userId(), {
            $addToSet: {
                follows: id
            }
        });
        Meteor.users.update(Meteor.users.findOne({"_id": id})._id, {
            $addToSet: {
                followed: Meteor.userId()
            }
        });
    },
    unfollowId: function(id) {
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                follows: id
            }
        });
        Meteor.users.update(Meteor.users.findOne({"_id": id})._id, {
            $pull: {
                followed: Meteor.userId()
            }
        });
    },
    addCommentToPost: function(postId, commentId) {
        var temp = Posts.findOne({_id: postId}).comments;
        temp.push(commentId);
        Posts.update(postId, {
            $set: {
                comments: temp
            }
        });
    },
    editProfile: function(s_bio, s_country, s_university, s_pic) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                bio: s_bio,
                country: s_country,
                university: s_university
            }
        });
    },
    add_image: function(id) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                image: id,
                facebook_image: 0
            }
        });
    },
    medals: function() {
        Meteor.users.update({
            "_id": Meteor.userId()
        }, {
            $inc: {
                medals: 1
            }
        });
    },
    increment_tag: function(tag_name) {
        Tags.update({
            title: tag_name
        }, {
            $inc: {
                number: 1
            }
        });
    },
    sendEmail: function(to, from, subject, text) {
        check([
            to, from, subject, text
        ], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({to: to, from: from, subject: subject, text: text});
    }
});
