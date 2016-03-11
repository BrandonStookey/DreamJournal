var app = require('./server');

var filePath = require('path');
var publicPath = filePath.resolve('public') + '/';
var helpers = require(filePath.resolve('server/helpers'));
var jwt = require('express-jwt');

///////Below is the ClientID and ClientSecret in express-jwt's configuration so that it can validate and sign JWTs for you
var jwtCheck = jwt({
  secret: new Buffer('H8Ak4IV8GXTBGOwT-syXyq0veCOixjcNgHkBxm_nOKaMeQoXG11u0DK6lHr-9N2I', 'base64'),
  audience: '1lZ3sYfpkqI5yJkeFXYscvLsR7dnG7q2'
});

//Below are paths that require Authorization////
app.use(['/api/public/client/app/shared/home.view.html', '/api/public/client/app/shared/write.new.post.view.html', '/api/public/client/app/shared/view.post.view.html', '/api/public/client/app/shared/profile.view.html', '/api/public/client/app/shared/graph.view.html'],  jwtCheck);

var routes = [


];