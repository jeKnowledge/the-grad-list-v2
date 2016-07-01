Meteor.startup(function() {
    smtp = {
        username: 'your_username', // eg: server@gentlenode.com
        password: 'your_password', // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com', // eg: mail.gandi.net //sandbox26cc34aaebf44b779aafa30daccd7ec7.mailgun.org
        port: 25
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Images.load('https://image.freepik.com/free-icon/graduation-student-black-cap_318-56675.jpg', {
        fileName: 'logo.png',
        meta: {}
    });
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

ServiceConfiguration.configurations.insert({service: 'facebook', appId: '456456687891709', secret: 'a44659b9325db81c25af3a15ef74da60'});
