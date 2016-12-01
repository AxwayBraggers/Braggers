var Arrow = require('arrow')
server = Arrow.getGlobal();
var auth = new (require('appcgithubauth'))(server);
var passport = auth.getPassport();

var CallbackRoute = Arrow.Router.extend({
	name: 'login',
	path: '/auth/github/callback',
	method: 'GET',
	description: 'this is an example web route',
	action: passport.authenticate('github',
		{
			successRedirect: "/api/github/success",
			failureRedirect: "/saml/login-error" // where the user gets redirected on errror
		})
});

module.exports = CallbackRoute;
