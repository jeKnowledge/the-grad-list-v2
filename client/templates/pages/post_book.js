Template.postBook.helpers({
    title: function() {
        if (Posts.find({
            $and: [
                {
                    owner: this._id
                }, {
                    completed: true
                }
            ]
        }).count() !== 0) {
            return "Completed posts by";
        } else {
            return "No challenges were completed by";
        }
    },

    postsCompleted: function() {
        return Posts.find({
            $and: [
                {
                    owner: this._id
                }, {
                    completed: true
                }
            ]
        });
    }
});
