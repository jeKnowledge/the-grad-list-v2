var currentTab = 'sign_up';

Template.authentication.events({
    'click #sign-in-btn': function(event, err) {
        if (currentTab == 'sign_in') {
            Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(), $('#sign-in-tab').find('#password-input').val(), function(err) {
                if (err) {
                    if (err.reason === "Match failed") {
                        sAlert.error('Please enter valid username and password', {
                            effect: 'slide',
                            position: 'bottom-right',
                            timeout: 'none',
                            onRouteClose: false,
                            stack: false,
                            offset: '80px'
                        });
                    } else {
                        sAlert.error('Username or password incorrect', {
                            effect: 'slide',
                            position: 'bottom-right',
                            timeout: 'none',
                            onRouteClose: false,
                            stack: false,
                            offset: '80px'
                        });
                    }
                    console.log(err);
                }
            });
        }
        currentTab = 'sign_in';
    },

    'click #sign-up-btn': function(event) {
        if (currentTab == 'sign_up') {
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
                }
            });
            var pass = $('#sign-up-tab').find('#password-input').val();
            var confirm_pass = $('#sign-up-tab').find('#password-confirm-input').val();
            if (pass === confirm_pass) {
                Accounts.createUser({username: $('#sign-up-tab').find('#username-input').val(), password: $('#sign-up-tab').find('#password-input').val()});
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
        console.log(currentTab);
    },

    'keypress input#password-input': function(evt, template) { //to do -> password input algo exists in sign up and enter shouldn't work there
        if (evt.which === 13) {
            Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(), $('#sign-in-tab').find('#password-input').val(), function(err) {
                if (err) {
                    sAlert.error('Username or password incorrect', {
                        effect: 'slide',
                        position: 'bottom-right',
                        timeout: 'none',
                        onRouteClose: false,
                        stack: false,
                        offset: '80px'
                    });
                    console.log(err);
                }
            });
        }
    },

    'keypress input#password-confirm-input': function(evt, template) {
        if (evt.which === 13) {
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
                }
            });
            var pass = $('#sign-up-tab').find('#password-input').val();
            var confirm_pass = $('#sign-up-tab').find('#password-confirm-input').val();
            if (pass === confirm_pass) {
                Accounts.createUser({username: $('#sign-up-tab').find('#username-input').val(), password: $('#sign-up-tab').find('#password-input').val()});
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
        }
        currentTab = 'sign_up';
    }
});
