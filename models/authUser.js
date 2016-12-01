var Arrow = require('arrow');

var User = Arrow.Model.extend('authUser',{
	fields: {
		githubId: {type: Number},
		displayName: {type:String},
		username: {type:String},
		profileUrl: {type:String},
		data: {type:Object},
		repos: {type:Array},
	},
	connector: 'appc.arrowdb'
});

module.exports = User;