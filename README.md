[![Stories in Ready](https://badge.waffle.io/BrandonStookey/dreamjournal.png?label=ready&title=Ready)](https://waffle.io/BrandonStookey/dreamjournal)
#Dream Journal

- Project Name: dreamjournal
- Product Owner: Brandon Stookey
- Scrum Master: Brandon Stookey
- Development: BrandonS Stookey

## Table of Contents
- Usage
- Requirements
- Installing Dependencies
- Contributing

##Usage
- Fork and clone this repo.

##Requirements
- Node 0.12.7
- Mongo


##Installing Dependencies
From within the root directory:

- sudo npm install -g bower
- sudo npm install -g grunt-cli

- npm install 
	runs bower install for you

- grunt  
	- Handles compilation, concatenation, and minification of files

- npm start 
	- Uses nodemon
	- The server runs on port 4568 by default

	In production: 
		- node server/server.js 

	- Booting up the server for the first time will create the db schema. 	

	- Auth0: Create an [Auth0](https://auth0.com/) account
		Make sure your allowed callback URLs are set up appropriately on Auth0 (include at least http://localhost:4568/ and http://127.0.0.1:4568/).	

#Testing
Tests are made with Karma and Jasmine for client side testing and Mocha for server side testing. Tests are located in ./test directory. To run the test just run npm test in your terminal. 

#Contributing
- See _CONTRIBUTING.md for contribution guidelines.




