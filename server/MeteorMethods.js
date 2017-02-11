Meteor.methods({
    loginFacebook: function() {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                username: Meteor.user().services.facebook.name,
                image: 'grad.png',
                facebook_login: true
            }
        });
    },

    completeTutorial: function() {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                tutorial: true
            }
        });
    },

    completePost: function(id) {
        check(id, String);
        Posts.update({
            _id: id
        }, {
            $set: {
                completed: true,
                date: new Date()
            }
        });
    },

    defaultPicture: function() {
        var defaultPicture = 'grad.png';
        Meteor.users.update(Meteor.userId(), {
            $set: {
                image: defaultPicture
            }
        });
    },

    doesUserExist: function(name) {
        check(name, String);
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

    doesEmailExist: function(email) {
      check(email, String);
      var email_exists = Meteor.users.findOne({
          "emails.address": email
      }, {
          fields: {
              "_id": 1
          }
      });
      if (email_exists) {
          return true;
      } else {
          return false;
      }
    },

    deletePost: function(id) {
        check(id, String);
        if (Meteor.userId() == Posts.findOne({
                "_id": id
            }).owner) {
            tags = Posts.findOne({
                "_id": id
            }).tags;
            for (var i = 0; i < tags.length; i++) {
                Tags.update({
                    title: tags[i]
                }, {
                    $inc: {
                        number: -1
                    }
                });
                if (Tags.findOne({
                        title: tags[i]
                    }).number == -1) {
                    var tags_id = Tags.findOne({
                        title: tags[i]
                    })._id;
                    Tags.remove(Tags.findOne({
                        "_id": tags_id
                    }));
                }

            }
            if (Posts.findOne({
                    "_id": id
                }).completed === true) {
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
        check(id, String);
        if (Meteor.userId() == Comments.findOne({
                _id: id
            }).owner) {
            Comments.remove(id);
        }
    },

    forkPost: function(id) {
        check(id, String);
        var post2 = {
            title: Posts.findOne({
                _id: id
            }).title,
            owner: Meteor.userId(),
            forkedFrom: Posts.findOne({
                _id: id
            }).username,
            date: new Date(),
            username: Meteor.user().username,
            image: Posts.findOne({
                _id: id
            }).image,
            completed: false,
            comments: [],
            likes: [],
            tags: Posts.findOne({
                _id: id
            }).tags
        };
        var tags = Posts.findOne({
            _id: id
        }).tags;
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
        check(id, String);
        Posts.update(Posts.findOne({
            _id: id
        }), {
            $addToSet: {
                likes: Meteor.userId()
            }
        });
    },

    dislikePost: function(id) {
        check(id, String);
        Posts.update(Posts.findOne({
            _id: id
        }), {
            $pull: {
                likes: Meteor.userId()
            }
        });
    },

    updateImagesCompletion: function(id, picture) {
      check(id, String);
      check(picture, String);
      Posts.update({
          _id: id
      }, {
          $push: {
              imagesOfCompletion: picture || 0
          }
      });
    },

    followId: function(id) {
        check(id, String);
        Meteor.users.update(Meteor.userId(), {
            $addToSet: {
                follows: id
            }
        });
        Meteor.users.update(Meteor.users.findOne({
            "_id": id
        })._id, {
            $addToSet: {
                followed: Meteor.userId()
            }
        });
    },

    unfollowId: function(id) {
        check(id, String);
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                follows: id
            }
        });
        Meteor.users.update(Meteor.users.findOne({
            "_id": id
        })._id, {
            $pull: {
                followed: Meteor.userId()
            }
        });
    },

    addCommentToPost: function(postId, commentId) {
        check(postId, String);
        check(postId, String);
        var temp = Posts.findOne({
            _id: postId
        }).comments;
        temp.push(commentId);
        Posts.update(postId, {
            $set: {
                comments: temp
            }
        });
    },

    editProfile: function(s_bio, s_country, s_university, s_username, pass) {
        check(s_bio, String);
        check(s_country, String);
        check(s_university, String);
        check(s_username, String);
        check(pass, String);
        Meteor.users.update(Meteor.userId(), {
            $set: {
                bio: s_bio,
                country: s_country,
                university: s_university,
                username: s_username
            }
        });
        Accounts.setPassword(this.userId, pass, {logout: false});
    },

    add_image: function(id) {
        check(id, String);
        Meteor.users.update(Meteor.userId(), {
            $set: {
                image: id,
                facebook_login: false
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
        check(tag_name, String);
        Tags.update({
            title: tag_name
        }, {
            $inc: {
                number: 1
            }
        });
    },

    changePasswordd: function(email, pass) {
      check(email, String);
      check(pass, String);
      Accounts.setPassword(Meteor.users.findOne({ "emails.address" : email })._id, pass, {logout: false});
    },

    sendEmail: function(to, from, subject, text) {
      check([
          to, from, subject, text
      ], [String]);
      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();
      Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
      });
    }
});
