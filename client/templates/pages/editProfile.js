Template.editProfile.events({
	'submit form': function(e) {
        e.preventDefault();
        var s_bio = $(e.target).find('[name=bio]').val();
        var s_country = $(e.target).find('[name=country]').val();
        Meteor.call("editProfile", s_bio, s_country);
    }
});