Meteor.methods({
	deletePost: function(id) {
		if (Meteor.userId() == Posts.findOne({_id: id}).owner)
			Posts.remove(id);			
	},
	
	forkPost: function(id) {
		var post2 = {
			title: Posts.findOne({_id:id}).title,
			owner: Meteor.userId(),
			forkedFrom: Posts.findOne({_id:id}).username,
			date: new Date(),
			username: Meteor.user().username || Meteor.user().profile.name,
			image: Posts.findOne({_id:id}).image,

		};
		post2._id = Posts.insert(post2);
        },
        followId: function(id) {
            
            var temp = Meteor.users.findOne({_id: Meteor.userId()}). follows;
            
            temp.push(id);
            
            Meteor.users.update(Meteor.userId(), {$set: {follows: temp}});
            /*Meteor.users.findOne({_id: Meteor.userId() }).follows.push(id);
            console.log(id +" " + Meteor.userId());*/
        }
});
