var Arrow = require('arrow')
server = Arrow.getGlobal();
var auth = new (require('appcgithubauth'))(server);
var passport = auth.getPassport();

var LoginRoute = Arrow.Router.extend({
	name: 'login',
	path: '/auth/github/login',
	method: 'GET',
	description: 'this is an example web route',
	action: passport.authenticate('github')
});

module.exports = LoginRoute;
