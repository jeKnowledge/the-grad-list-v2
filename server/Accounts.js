Accounts.onCreateUser(function(options, user) {
    
    user.follows = new Array();
    user.followed = new Array();
    user.bio = new String();
    user.country = new String();
    user.university = new String();
    user.picture = new String();

    return user;
});
