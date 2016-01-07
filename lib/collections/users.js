UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username'],
  engine: new EasySearch.Minimongo()
});