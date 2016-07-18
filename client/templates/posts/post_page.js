Template.postPage.helpers({
    postExists: function() {
        const result = Posts.findOne({
            "_id": this._id
        }, {
            fields: {
                "_id": 1
            }
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    },

    comments: function() {
        return Comments.find({
            _id: {
                $in: this.comments
            }
        });
    }
});
