Meteor.startup(function() {
    smtp = {
        username: 'XXX@gmail.com', // eg: server@gentlenode.com
        password: 'XXX', // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com', // eg: mail.gandi.net
        port: 587
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.publish("posts", function() {
    return Posts.find({}, {
        sort: {
            date: -1
        }
    });
});

Meteor.publish("comments", function() {
    return Comments.find({}, {
        sort: {
            date: -1
        }
    });
});

Meteor.publish("tags", function() {
    return Tags.find({}, {
        sort: {
            date: -1
        }
    });
});

Meteor.publish("usersData", function() {
    if (this.userId) {
        return Meteor.users.find({}, {
            fields: {
                "username": true,
                "email": true,
                _id: true,
                follows: true,
                followed: true,
                'services.facebook.name': true,
                'services.facebook.id': true,
                'bio': true,
                'country': true,
                'university': true,
                'picture': true,
                'image': true,
                'facebook_login': true,
                'medals': true
            }
        });
    } else {
        this.ready();
    }
});

Meteor.publish("files.images.all", function() {
    return Images.collection.find({});
});

ServiceConfiguration.configurations.remove({service: 'facebook'});

ServiceConfiguration.configurations.insert({service: 'facebook', appId: process.env.FACEBOOK_APP_ID, secret: process.env.FACEBOOK_SECRET});
