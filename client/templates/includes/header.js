Template.header.helpers({
  userID: function() {
    return Meteor.userId();
  },
  getUsername: function() {
    return Meteor.user().username;
  },
  indexes: function() {
    return [UsersIndex, TagsIndex];
  },
  usersIndex: function() {
    return UsersIndex;
  },
  tagsIndex: function() {
    return TagsIndex;
  },
  inputAttributes: function() {
    return {
      placeholder: "Search",
      class: 'form-control'
    };
  },
  hashtag: function() {
    //
  }
});


Template.header.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
