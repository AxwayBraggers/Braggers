var Arrow = require('arrow');
var request = require('request');

var UserAPI = Arrow.API.extend({
	group: 'githubUser',
	path: '/api/github/success',
	method: 'GET',
	description: 'this is an api that shows how to implement an API',
	model: 'authUser',
	action: function (req, resp, next) {
		user_data = req.user;
		//Check & replace for an id field
		if(user_data.id){
			delete user_data.id;
		}
		// invoke the model find method passing the id parameter
		// stream the result back as response
		getUserRepos(user_data.username, function (userRepoData) {
			user_data.repos = userRepoData;
			//check if model exists
			req.model.find({ username: user_data.username }, function (error, data) {
				//No records found
				if (error || data.length < 1) {
					//Persist the record
					req.model.create(user_data, function (err, userModel) {
						if (err) {
							throw new Error(err);
						}
						//return callback
						resp.stream(getLoggedinData, next);
					});
				} else {
					resp.stream(getLoggedinData, next);
				}
			})
			//Persist the record
			// req.model.create(user_data, function (err, userModel) {
			// 	if (err) {
			// 		throw new Error(err);
			// 	}

			// 	//return callback
			// 	resp.stream(getLoggedinData, next);
			// });
		})

	}
});
var user_data = {};

function getLoggedinData(callback) {
	callback(null, user_data);
}

function getUserRepos(username, callback) {
	options = {
		url: `https://api.github.com/users/${username}/repos`,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
		}
	}

	request(options, function (err, response, body) {
		var data = [];
		if (typeof body !== 'object' || typeof body !== 'array')
			body = JSON.parse(body);
		if (err || body.length < 1)
			return [];

		if (body) {
			for (var i = 0; i < body.length; i++) {
				data[i] = {
					"url": body[i].html_url,
					"description": body[i].description,
					"size": body[i].size,
					"stargazers_count": body[i].stargazers_count,
					"watchers_count": body[i].watchers_count,
					"language": body[i].language,
					"has_issues": body[i].has_issues,
					"has_downloads": body[i].has_downloads,
					"has_wiki": body[i].has_wiki,
					"has_pages": body[i].has_pages,
					"forks_count": body[i].forks_count,
					"mirror_url": body[i].mirror_url,
					"open_issues_count": body[i].open_issues_count,
					"forks": body[i].forks,
					"open_issues": body[i].open_issues,
					"watchers": body[i].watchers,
					"default_branch": body[i].default_branch
				}
			}
		}
		callback(data);
	})
}

module.exports = UserAPI;
