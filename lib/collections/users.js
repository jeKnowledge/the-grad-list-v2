UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username', 'picture'],
  engine: new EasySearch.Minimongo()
});