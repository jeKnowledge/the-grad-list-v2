Accounts.onCreateUser(function(options, user) {
    user.follows = new Array();
    user.followed = new Array();
    return user;
});
