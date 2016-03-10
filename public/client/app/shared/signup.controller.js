'use strict';
angular.module('dreamjournal.signup', [])

.controller('signupController', ['$scope', function ($scope) {
	// will have a HTTP request that will send a post to routes.js
		//data will contain all of the users information for signup
		//if it recieves a 200 response, it will redirect user to homepage(Remember use angular $location method)
			//it will create a session or assign a token for Auth
		//if it recieves 409(conflict I think) user will be prompted to enter new username


}]);