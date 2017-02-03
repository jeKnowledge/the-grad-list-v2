UsersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: [
        'username', 'picture'
    ],
    engine: new EasySearch.Minimongo()
});

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

TagsIndex = new EasySearch.Index({collection: Tags, fields: ['title'], engine: new EasySearch.Minimongo()});
