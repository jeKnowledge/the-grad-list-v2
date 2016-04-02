Template.header.helpers({
  userID: function() {
    return Meteor.userId();
  },
  getUsername: function() {
    return Meteor.user().username;
  },
  indexes: function() {
    return [UsersIndex, PostsIndex];
  },
  usersIndex: function () {
    return UsersIndex;
  },
  postsIndex: function () {
    return PostsIndex;
  },
  inputAttributes: function() {
    return {placeholder: "Search", class: 'form-control'};
  }
});


Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});
