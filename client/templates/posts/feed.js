Template.feed.helpers({
    postsByFollows: function() {
        return Posts.find( 
            {owner: { $in: Meteor.user().follows  }},
            {sort: {date: -1}}
        );
    }
});