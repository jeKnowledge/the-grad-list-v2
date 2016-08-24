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
            if (err) {
                sAlert.error('Facebook login failed', {
                    effect: 'slide',
                    position: 'bottom-right',
                    timeout: 'none',
                    onRouteClose: false,
                    stack: false,
                    offset: '80px'
                });
            }
            console.log(Meteor.userId());
            console.log(Meteor.user().services.facebook.name);
            Meteor.call("loginFacebook", Meteor.userId());
            console.log(Meteor.userId());
        });
    },

    'submit form': function(event) {
        event.preventDefault();
    },

    'keypress input#password-input': function(evt, template) {
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
        currentTab = 'sign_up';/*
        Meteor.call('sendEmail', 'teresa.sal13@gmail.com', 'teresa.sal13@gmail.com', 'Hello from Meteor!', 'This is a test of Email.send.');
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
        /*var resetPasswordForm = $(e.currentTarget),
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
        return false;*/
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
    const email = $('#sign-up-tab').find('#email-input').val();
    const pass = $('#sign-up-tab').find('#password-input').val();
    const confirm_pass = $('#sign-up-tab').find('#password-confirm-input').val();
    const name = $('#sign-up-tab').find('#username-input').val();
    let check_user = 1;
    let check_email = validateEmail(email);
    if (check_email === false) {
        sAlert.error('Invalid email', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    }
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
    if (pass != confirm_pass) {
        sAlert.error('Passwords do not match', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    }
    if (pass == confirm_pass && check_user == 1 && check_email === true) {
        Accounts.createUser({username: $('#sign-up-tab').find('#username-input').val(), email: $('#sign-up-tab').find('#email-input').val(), password: $('#sign-up-tab').find('#password-input').val()});
        Meteor.call("defaultPicture", Meteor.userId());
    }
};

if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}

validateEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
