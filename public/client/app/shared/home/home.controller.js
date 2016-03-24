'use strict';

angular.module('dreamjournal.home', ['ngSanitize'])

.controller('homeController', ['$scope', '$http', 'auth', 'ViewSinglePostFromHomeAndFromProfile', function ($scope, $http, auth, ViewSinglePostFromHomeAndFromProfile) {
	$scope.postsData = [];
  $scope.userData = [];

  angular.extend($scope, ViewSinglePostFromHomeAndFromProfile);
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  

  $scope.init= function(userName, userEmail){
   //======================Create New User on Init=========================
    var userName = auth.profile.name;
    var userEmail = auth.profile.email;  

      $http({
        method: 'POST',
        url: '/create/new/user',
        data: {name: userName, email: userEmail}
      })
      .then(function(resp){
        $scope.userData.unshift(resp);
      }, function(err){
        console.log('error', err);
      });

    //======================Get All Blog Posts On Init======================

  	$http({
  		method: 'GET',
  		url: '/get/all/posts'
  	})
   .then(function(result) {
	    result.data.forEach(function(post) {
	    	$scope.postsData.unshift(post);
	    });	
	    console.log('Post GET successful');
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
  };

  $scope.init();

  //======================Create Comment====================================

  $scope.commentOnPost = function(comment, postID){
     $http({
      method: 'POST',
      url: '/create/new/comment',
      data: {postID: postID, name: $scope.userName, comment: comment}
    })
    .then(function(resp){
      //refreshes and updates the page
      // $location('/home');

      $scope.postsData = [];
      $scope.init();
    }, function(err){
      console.log('error', err);
    }); 
  };
  
//==========================Delete Comment==================================

$scope.deleteComment = function(postID, commentID){
     $http({
      method: 'POST',
      url: '/delete/comment',
      data: {postID: postID, commentID: commentID}
    })
    .then(function(resp){
      //refreshes and updates the page
      $scope.postsData = [];      
      $scope.init();
    }, function(err){
      console.log('error', err);
    }); 
};


//=========================Shows/Hide Comments===============================
  $scope.viewComments;
  $scope.counter = 0;
  $scope.isUser;

  $scope.showComments = function(postID){
    if($scope.counter % 2 === 0){
      $scope.counter++;
      $scope.viewComments = postID;
      return $scope.viewComments;
    }
    $scope.counter++;
    $scope.viewComments = 0;
    return $scope.viewComments;
  };

//===================Shows delete button only if it is user's comment  

  $scope.showButton = function(){
    $scope.isUser = $scope.userName;
    console.log('showButton ', $scope.isUser);
    return $scope.isUser;
  };

//====================================Like Post

$scope.likeCounter = 0;
$scope.userLikePost = false;

$scope.likePost = function(postID){
    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }
//=========================if userLikePost is true then it will add a new like to the post in the database
  if($scope.userLikePost){
     $http({
      method: 'POST',
      url: '/like/comment',
      data: {postID: postID, userEmail: $scope.userEmail, name: $scope.userName, like: $scope.userLikePost}
    })
    .then(function(resp){
      //refreshes and updates the page
      $scope.postsData = [];      
      $scope.init();
    }, function(err){
      console.log('error', err);
    });     
  } else{
//=========================if userLikePost is false then it will remove the 'like' from the database    
     $http({
      method: 'POST',
      url: '/delete/like/comment',
      data: {postID: postID, userEmail: $scope.userEmail, like: $scope.userLikePost}
    })
    .then(function(resp){
      //refreshes and updates the page
      $scope.postsData = [];      
      $scope.init();
    }, function(err){
      console.log('error', err);
    });   
  }
};

}])

//==================================================================Allow user to view a single post========================================================================

.factory('ViewSinglePostFromHomeAndFromProfile',['$http', 'auth','$location', function($http, auth, $location){
  var singlePost = [];
  var viewSinglePost = function(postID){
    $http({
      method: 'POST',
      url: '/view/single/post',
      data: {postid: postID}
    })
    .then(function(resp){
      console.log('viewSinglePost resp ', resp);      
      singlePost[0] = resp;
      $location.path('/viewPost');
      console.log('homeController: ', singlePost);
    }, function(err){
      console.log('error', err);
    });
  } 
  
  return{
    viewSinglePost: viewSinglePost,
    singlePost: singlePost
  };
}])
//===========================================================Allows comments to be posted by hitting enter key=========================================================

.directive('dlEnterKey', function() {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                scope.$apply(function() {
                        // Evaluate the expression
                    scope.$eval(attrs.dlEnterKey);
                });

                event.preventDefault();
            }
        });
    };
});













