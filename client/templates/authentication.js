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
                    timeout: '3000',
                    onRouteClose: false,
                    stack: false,
                    offset: '80px'
                });
            }
            Meteor.call("loginFacebook", Meteor.userId());
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

    'click #forgot-password': function(event) {
        var name = $('#sign-in-tab').find('#username-input').val();
        Meteor.call('findEmailByUsername', name, function(error, result) {
            Accounts.forgotPassword({
                email: result
            }, function(e, r) {
                if (e) {
                    console.log(e.reason);
                } else {
                    console.log("check you email");
                }
            });
        });
    },

    'click #reset-password': function(event) {
        currentTab = 'sign_up';
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
                timeout: '3000',
                onRouteClose: false,
                stack: false,
                offset: '80px',
            });
        }
    });
    sAlert.closeAll();
};

var callback_signup = function() {
    var email = $('#sign-up-tab').find('#email-input').val();
    var pass = $('#sign-up-tab').find('#password-input').val();
    var confirm_pass = $('#sign-up-tab').find('#password-confirm-input').val();
    var name = $('#sign-up-tab').find('#username-input').val();
    var check_user = 1;
    var check_email = validateEmail(email);
    if (check_email === false) {
        sAlert.error('Invalid email', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: '3000',
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
                timeout: '3000',
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
            timeout: '3000',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    }
    if (pass == confirm_pass && check_user == 1 && check_email === true) {
        Accounts.createUser({
            username: $('#sign-up-tab').find('#username-input').val(),
            email: $('#sign-up-tab').find('#email-input').val(),
            password: $('#sign-up-tab').find('#password-input').val()
        });
        Meteor.call("defaultPicture", Meteor.userId());
        sAlert.closeAll();
    }
};

if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}

validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
