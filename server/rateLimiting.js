// Subscriptions
for (var subscription in Meteor.default_server.publish_handlers) {
  DDPRateLimiter.addRule({
    type:'subscription',
    name:'subscription'
  }, 5, 1000);
}

// Methods
for (var method in Meteor.default_server.method_handlers) {
  DDPRateLimiter.addRule({
    type:'method',
    name:'method'
  }, 5, 1000);
}

Accounts.validateLoginAttempt(function(attempt){
  return true;
});
