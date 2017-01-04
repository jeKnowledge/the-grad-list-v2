Template.headerTutorial.events({
    'click #ignore': function(event) {
        sAlert.error('You have to complete the tutorial', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: '3000',
            onRouteClose: false,
            stack: false,
            offset: '80px',
        });
    },

    'click #profile-alert': function(event) {
        sAlert.error('This is your profile. You can edit it and take a look at your goals.', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: '3000',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    },

    'click #my-book-alert': function(event) {
        console.log("oi");
        sAlert.error('Welcome to My Book! This is where you can view your completed goals.', {
            effect: 'slide',
            position: 'bottom-right',
            timeout: '3000',
            onRouteClose: false,
            stack: false,
            offset: '80px'
        });
    },

    'click #logout': function(event) {
        event.preventDefault();
        Session.clear();
        Meteor.logout();
        Router.go('/');
        document.location.reload(true);
    }
});

Template.headerTutorial.helpers({
    indexes: function() {
        return [UsersIndex, TagsIndex];
    },

    usersIndex: function() {
        return UsersIndex;
    },

    tagsIndex: function() {
        return TagsIndex;
    },

    inputAttributes: function() {
        return {
            placeholder: "Search",
            class: 'form-control'
        };
    },

    getUsername: function() {
        return Meteor.user().username;
    },

    step3: function() {
        return Session.get("step3");
    },

    step4: function() {
        return Session.get("step4");
    },
});
