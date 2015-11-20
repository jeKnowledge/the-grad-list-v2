Template.postItem.helpers({

	isCurrentUser:function()
	{
		return (Meteor.userId() == this.owner)
			
	},

	isOwner: function(){
      return this.owner === Meteor.userId();
    },

    isForked: function() {
    	return this.hasOwnProperty("forkedFrom");
    },

    forkedFrom: function() {
    	return this.forkedFrom;
    },
    
    isLoggedIn: function() {
    	var user = Meteor.user()
    	if(user) {
    		return true;
    	}
    },
    
    isNotOwner: function() {
    	return this.owner !== Meteor.userId();
    },

    ownerUsername: function() {
      return Meteor.users.findOne({"_id": this.owner}).username;
}

});



Template.postItem.events({
	'click .delete': function() {
		Meteor.call("deletePost", this._id);
	},

	'click .fork': function() {
		Meteor.call("forkPost", this._id);
	} 
});
