Meteor.startup(function() {
    Images.load('https://camo.githubusercontent.com/d818d23678800c7755a49d7f5b26ad0d6cb0aea7/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f343932303733362f3733363937342f65323534356335322d653332352d313165322d383030302d3864646163393762653831352e706e67', {
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
                _id: true,
                follows: true,
                followed: true,
                'services.facebook.name': true,
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
