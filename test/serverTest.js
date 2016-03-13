// var express = require('express');
// var expect = require('chai').expect;
// var app = require('../server/server.js');

// var db = require('../db/config');
// var User = require('../db/db.js');



// describe('', function() {

//   beforeEach(function(done) {
//     // Log out currently signed in user
//     request(app)
//       .get('/logout')
//       .end(function(err, res) {

//         // Delete objects from db so they can be created later for the test
//         Link.remove({url : 'http://www.roflzoo.com/'}).exec();
//         User.remove({username : 'Savannah'}).exec();
//         User.remove({username : 'Phillip'}).exec();

//         done();
//       });
//   });
 
//   describe('addUser', function () {
//     it('Should add a user to the database', function(done) {
//       helpers.addBook({name: 'Leo Tolstoy'}, {title: 'War and Peace'}, null, null,
//         function(data){
//           data = JSON.parse(data);
//           expect(typeof data.book.id).to.equal('number');
//           expect(typeof data.author.id).to.equal('number');
//           expect(data.book.title).to.equal('War and Peace');
//           expect(data.author.name).to.equal('Leo Tolstoy');
//           done();
//         }, function (error) {
//           console.log(error);
//         });
//     });
//   });
  

// });
