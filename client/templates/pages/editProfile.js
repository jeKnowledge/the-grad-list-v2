Template.editProfile.events({
	'submit form': function(e) {
        e.preventDefault();
        var s_bio = $(e.target).find('[name=bio]').val();
        var s_country = $(e.target).find('[name=country]').val();
        var s_university = $(e.target).find('[name=university]').val();
        var s_pic = $(e.target).find('[name=picture]').val()
        Meteor.call("editProfile", s_bio, s_country, s_university, s_pic);
        Router.go("/");
    }
});