Template.home.helpers({
  user: function(){
      return Meteor.users.find();
  }	
})
