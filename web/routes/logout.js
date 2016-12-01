var Arrow = require('arrow')
server = Arrow.getGlobal();
var auth = new (require('appcgithubauth'))(server);
var passport = auth.getPassport();

var LogoutRoute = Arrow.Router.extend({
	name: 'logout',
	path: '/auth/github/logout',
	method: 'GET',
	description: 'this is an example web route',
	action: function(req, resp){
		req.logout();
		resp.redirect('/');
	}
});

module.exports = LogoutRoute;
