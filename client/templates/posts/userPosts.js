Template.userPosts.helpers({
	postsByUser: function() {
		return Posts.find({owner: this._id}, {sort: {date: -1}});
	},
  
  getUsername: function() {
    return Meteor.users.find({_id: this._id}).username || Meteor.users.find({_id: this._id}).profile.name ;
}
});
