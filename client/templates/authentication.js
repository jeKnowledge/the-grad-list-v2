var currentTab = 'sign_up';

Template.authentication.events({
    'click #sign-in-btn': function(event, err) {
        if (currentTab == 'sign_in') {
            callback_signin();
        }
        currentTab = 'sign_in';
    },

    'click #sign-up-btn': function(event) {
        if (currentTab == 'sign_up') {
            callback_signup();
        }
        currentTab = 'sign_up';
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err) {
            Meteor.call("loginFacebook", Meteor.userId());
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'submit form': function(event) {
        event.preventDefault();
    },

    'keypress input#password-input': function(evt, template) { //to do -> password input algo exists in sign up and enter shouldn't work there
        if (evt.which === 13) {
            callback_signin();
        }
    },

    'keypress input#password-confirm-input': function(evt, template) {
        if (evt.which === 13) {
            callback_signup();
        }
        currentTab = 'sign_up';
    },

    'submit #forgotPasswordForm': function(e, t) {
        Meteor.call('sendEmail', 'teresa.sal13@gmail.com', 'teresa.sal13@gmail.com', 'Hello from Meteor!', 'This is a test of Email.send.');
        currentTab = 'sign_up';/*
        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());
        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({
                email: email
            }, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                } else {
                    console.log('Email Sent. Check your mailbox.');
                }
            });
        }
        e.preventDefault();
        return false;*/

    },

    'submit #resetPasswordForm': function(e, t) {
        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    console.log('We are sorry but something went wrong.');
                } else {
                    console.log('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                }
            });
        }
        e.preventDefault();
        return false;
    }
});

Template.authentication.events({
    resetPassword: function() {
        return Session.get('resetPassword');
    }
});

var callback_signin = function() {
    Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(), $('#sign-in-tab').find('#password-input').val(), function(err) {
        if (err && err.reason !== "Match failed") {
            sAlert.error('Username or password incorrect', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 'none',
                onRouteClose: false,
                stack: false,
                offset: '80px'
            });
        }
    });
};

var callback_signup = function() {
    var check_user = 1;
    var check_email = 1;
    var name = $('#sign-up-tab').find('#username-input').val();
    Meteor.call('doesUserExist', name, function(error, result) {
        if (result === true) {
            sAlert.error('Username already exists', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 'none',
                onRouteClose: false,
                stack: false,
                offset: '80px'
            });
            check_user = 0;
        }
    });
    var email = $('#sign-up-tab').find('#email-input').val();
    console.log(check_email);
    Meteor.call("validateEmail", email, function(error, result) {
        if (result === false) {
            sAlert.error('Invalid email adress', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 'none',
                onRouteClose: false,
                stack: false,
                offset: '80px'
            });
            check_email = 0;
            console.log(check_email);
        }
    });
    console.log(check_email);
    var pass = $('#sign-up-tab').find('#password-input').val();
    var confirm_pass = $('#sign-up-tab').find('#password-confirm-input').val();
    console.log(check_email);
    if (pass === confirm_pass && check_user === 1 && check_email === 1) {
        Accounts.createUser({username: $('#sign-up-tab').find('#username-input').val(), email: $('#sign-up-tab').find('#email-input').val(), password: $('#sign-up-tab').find('#password-input').val()});
        Meteor.call("defaultPicture", Meteor.userId());
    } else {
        sAlert.error('Passwords do not match', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    }
};

if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}
