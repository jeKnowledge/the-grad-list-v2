UsersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: [
        'username', 'picture'
    ],
    engine: new EasySearch.Minimongo()
});

TagsIndex = new EasySearch.Index({collection: Tags, fields: ['title'], engine: new EasySearch.Minimongo()});
