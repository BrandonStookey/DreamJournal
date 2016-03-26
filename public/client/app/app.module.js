angular.module('dreamjournal.services', [])

.factory('djMainFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
// ($rootScope.signedIn) <-----------------------Could help me check if user is signed in, and only do a createuser call once
	//refer to routes on legacy, they have this at the bottom. Really could fix my bug


  var userName = auth.profile.name;
  var userEmail = auth.profile.email;  
	var allPostsData = [];
  var userPostsData = [];
  var singlePost = [];
  var userData = [];

//===================================================================Create New User===============================================================
  var createUser = function(){    
  	$http({
        method: 'POST',
        url: '/user/',
        data: {name: userName, email: userEmail}
      })
      .then(function(resp){
        userData.unshift(resp);
      }, function(err){
        console.log('error', err);
      });
	};

//=======================================================================Get all User Posts===========================================================
  var getAllUserPosts = function(email){
    $http({
      method: 'GET',
      url: '/user/' + email,
    })
   .then(function(result) {
      // console.log('result ', result);
      // $scope.userPostsData = result;
      result.data.forEach(function(post) {
        userPostsData.unshift(post);
      }); 
      userPostsData = [];
    }, function(err) {
      console.error('Post GET error:', err);
    });
  }



//=====================================================================Get All Blog Posts=============================================================
	
  var getAllPosts = function(){
    $http({
    	method: 'GET',
    	url: '/post/',
    })
    .then(function(result) {
      result.data.forEach(function(post) {
        allPostsData.unshift(post);
      });
      allPostsData = [];    
    }, function(err) {
        console.error('Post GET error:', err);
    });
  }; 

//======================================================================View Single Post==========================================================================

  var viewSinglePost = function(postID){
    $http({
      method: 'GET',
      url: '/post/' + postID,
    })
   .then(function(result) {
        singlePost[0] = result;
        $location.path('/viewPost');
        singlePost = [];
        userPostsData = [];
        allPostsData = [];   
    }, function(err) {
      console.error('Post GET error:', err);
    });

  };

  //==================================================================Create Comment============================================================================

  var commentOnPost = function(comment, postID){
     $http({
      method: 'POST',
      url: '/create/new/comment',
      data: {postID: postID, name: userName, comment: comment}
    })
    .then(function(resp){
      //=====================A temp solution that does not really work
      getPosts();
    }, function(err){
      console.log('error', err);
    }); 
  };

	var deleteComment = function(postID, commentID){
      console.log('controllers: ', commentID);
     $http({
      method: 'POST',
      url: '/delete/comment',
      data: {postID: postID, commentID: commentID}
    })
    .then(function(resp){    
      //=====================A temp solution that does not really work
      getPosts();
    }, function(err){
      console.log('error', err);
    }); 
	};

//=======================================================================Like a Post=========================================================================
	
	var likePost = function(postID, userLikePost){
	//=========================if userLikePost is true then it will add a new like to the post in the database
	  if(userLikePost){
	     $http({
	      method: 'POST',
	      url: '/like/comment',
	      data: {postID: postID, userEmail: userEmail, name: userName, like: userLikePost}
	    })
	    .then(function(resp){
      //=====================A temp solution that does not really work
      getPosts();
	    }, function(err){
	      console.log('error', err);
	    });     
	  } else{
	//=========================if userLikePost is false then it will remove the 'like' from the database    
	     $http({
	      method: 'POST',
	      url: '/delete/like/comment',
	      data: {postID: postID, userEmail: userEmail, like: userLikePost}
	    })
	    .then(function(resp){
      //=====================A temp solution that does not really work
      getPosts();     
	    }, function(err){
	      console.log('error', err);
	    });   
	  }
	};



	return {
		allPostsData: allPostsData,
    userPostsData: userPostsData,
    singlePost: singlePost,
		userData: userData,
		userEmail: userEmail,
		userName: userName,
		createUser: createUser,
    getAllUserPosts: getAllUserPosts,
		getAllPosts: getAllPosts,
    viewSinglePost: viewSinglePost,
		commentOnPost: commentOnPost,
		deleteComment: deleteComment,
		likePost: likePost,
	}

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

