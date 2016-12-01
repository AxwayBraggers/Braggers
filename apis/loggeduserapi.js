var Arrow = require('arrow');

var TestAPI = Arrow.API.extend({
	group: 'testapi',
	path: '/api/github/logged',
	method: 'GET',
	description: 'this is an api that shows how to implement an API',
	model: 'authUser',
	action: function (req, resp, next) {
		//marinvvasilev
		user_data = req.user;
		if (typeof user_data === "undefined") {
			// invoke the model find method passing the id parameter
			// stream the result back as response
			req.model.find({ username: "marinvvasilev" }, function (error, data) {
				user_data = data[0];
				resp.stream(getLoggedinData, next);
			})
		} else {
			resp.stream(getLoggedinData, next);
		}
	}
});

var user_data = {};

function getLoggedinData(callback) {
	callback(null, user_data);
}

module.exports = TestAPI;
