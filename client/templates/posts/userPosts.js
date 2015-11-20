Template.userPosts.helpers({
	postsByUser: function() {
		return Posts.find({owner: this._id});
	},
  
  getUsername: function() {
    return Meteor.users.find({_id: this._id}).username || Meteor.users.find({_id: this._id}).profile.name ;
}
});