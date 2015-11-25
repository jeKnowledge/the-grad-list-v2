Template.postPage.helpers({
    comments: function() {
        console.log(this);
        console.log(Comments.findOne( { _id: { $in: this.comments  }}));
        return Comments.find( { _id: { $in: this.comments  }});
    }
});