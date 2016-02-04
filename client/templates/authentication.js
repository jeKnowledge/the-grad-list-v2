var currentTab = 'sign_up';

Template.authentication.events({
    'click #sign-in-btn': function (event, err) {
        if (currentTab == 'sign_in') {
            Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(),
            $('#sign-in-tab').find('#password-input').val(), function(err){
                if (err) {
                    if (err.reason === "Match failed") {
                        console.log('Todo:fix this error');
                    }
                    else {
                        sAlert.error('Username or password incorrect', {effect: 'slide', position: 'bottom-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
                    }
                    console.log(err);
                }
            });
        }
        currentTab = 'sign_in';
    },

    'click #sign-up-btn': function (event) {
        if (currentTab == 'sign_up') {
            Accounts.createUser({
                username: $('#sign-up-tab').find('#username-input').val(),
                password: $('#sign-up-tab').find('#password-input').val()
            });
            Meteor.call("defaultPicture", Meteor.userId());
        }

        currentTab = 'sign_up';
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
        Meteor.call("loginFacebook", Meteor.userId());
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'submit form': function (event) {
        event.preventDefault();

        console.log(currentTab);
    }
});
