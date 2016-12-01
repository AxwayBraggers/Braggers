var Arrow = require('arrow');

var UsersAPI = Arrow.API.extend({
	group: 'users',
	path: '/api/github/users/',
	method: 'GET',
	description: 'this is an api that shows how to implement an API',
	model: 'authUser',
	action: function (req, resp, next) {
		// invoke the model find method passing the id parameter
		// stream the result back as response
		resp.stream(req.model.findAll, next);
	}
});

module.exports = UsersAPI;
