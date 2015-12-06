Template.postItem.helpers({

	isCurrentUser:function()
	{
		return (Meteor.userId() == this.owner)
			
	},

	isOwner: function(){
      return this.owner === Meteor.userId();
    },

    isNotCompleted: function() {
    	return this.completed === false;
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
      return Meteor.users.findOne({"_id": this.owner}).username || Meteor.users.findOne({"_id": this.owner}).profile.name;
    }

});



Template.postItem.events({
	'click .delete': function() {
		Meteor.call("deletePost", this._id);
	},

	'click .fork': function() {
		Meteor.call("forkPost", this._id);
	},
	'submit .new-comment' : function(event) {
		event.preventDefault();

		var text = event.target.comment.value;

		var commentId = Comments.insert( {
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId()
		});

		Meteor.call("addCommentToPost", this._id, commentId);
		
		event.target.comment.value = "";
	}
});
