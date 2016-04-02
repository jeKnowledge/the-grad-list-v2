UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username', 'picture'],
  engine: new EasySearch.Minimongo()
});

PostsIndex = new EasySearch.Index({
  collection: Posts,
  fields: ['tags', 'title'],
  engine: new EasySearch.Minimongo()
});