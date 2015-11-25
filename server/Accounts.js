Accounts.onCreateUser(function(options, user) {
    
     user.follows = new Array();

    return user;
});

