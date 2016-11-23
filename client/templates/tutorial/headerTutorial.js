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

    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
        document.location.reload(true);
    }
});

Template.headerTutorial.helpers({
    getUsername: function() {
        return Meteor.user().username;
    },
});
