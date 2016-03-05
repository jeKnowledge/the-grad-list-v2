Template.userPosts.helpers({
    postsByUser: function() {
      console.log("ajksncaçkn");
    	console.log(this.tags);
      return Posts.find({ tags: this.tags }, {sort: {date: -1}});
    },

    oi: function() {
      return("jbzxlb");
    }
});
