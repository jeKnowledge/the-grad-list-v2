var currentTab = 'sign_up';

Template.authentication.events({
    'click #sign-in-btn': function (event) {
        if (currentTab == 'sign_in') {
            Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(),
                $('#sign-in-tab').find('#password-input').val());
        }

        currentTab = 'sign_in';
    },

    'click #sign-up-btn': function (event) {
        if (currentTab == 'sign_up') {
            Accounts.createUser({
                username: $('#sign-up-tab').find('#username-input').val(),
                password: $('#sign-up-tab').find('#password-input').val()
            });
        }

        currentTab = 'sign_up';
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){

            // todo chamar um Meteor method que preencha fields do Meteor.user() com
            // os fields respetivos que estão no Meteor.user().services.facebook

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
