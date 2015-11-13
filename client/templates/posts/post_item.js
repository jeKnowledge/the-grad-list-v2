Template.postItem.helpers({
	domain:function()
	{
		var a=document.createElement("a");
		a.href = this.url;
		return a.hostname;
	},
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

});



Template.postItem.events({
	'click .delete': function() {
		Meteor.call("deletePost", this._id);
	},

	'click .fork': function() {
		Meteor.call("forkPost", this._id);
	} 
});