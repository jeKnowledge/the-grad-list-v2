Template.editProfile.events({
	'submit form': function(e) {
        e.preventDefault();
        Meteor.users.update(Meteor.user.Id(),
        	{$set: { bio: $(e.target).find('[name=bio]').val(), 
        	university: $(e.target).find('[name=university]').val(),
        	country: $(e.target).find('[name=country]').val() }}
		);
    }
});