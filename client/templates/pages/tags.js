Template.userPosts.helpers({
    postsByUser: function() {
    	console.log(this.tags);
        return Posts.find({ tags: this.tags }, {sort: {date: -1}});
    },
})