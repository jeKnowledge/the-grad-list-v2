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

    'submit form': function (event) {
        event.preventDefault();

        console.log(currentTab);
    }
});
