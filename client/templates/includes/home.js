Template.home.helpers({
  user: function(){

      return Meteor.users.find({
      	$and:
      	[{"_id": { $nin: Meteor.user().follows}},
      	{"_id": { $ne: Meteor.userId() }}]
      	},
        {"limit":3});
  },

  check_followers: function() {
    if (Meteor.user().follows.length === 0) {
      return true;
    }
  },

  friends_of_friends: function(){
  	var friends = Meteor.user().follows;
  	var friends_of_friends = [];
  	for (var i = 0; i < friends.length; i++) {
  		friends_of_friends.push(Meteor.users.findOne({"_id": friends[i]}).follows);
  	}
  	function notcontains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return false;
        }
    }
    return true;
	}

  	var a = [];
  	for (var p = 0; p < friends_of_friends.length; p++) {
  		for (var j = 0; j < friends_of_friends[p].length; j++) {
  			if (friends_of_friends[p][j] != Meteor.userId() && notcontains(Meteor.user().follows, friends_of_friends[p][j]) ) {
  				a.push(Meteor.users.findOne({"_id":friends_of_friends[p][j]}));
  			}
  		}
  	}

  	return a.slice(0,3);
  }
});
