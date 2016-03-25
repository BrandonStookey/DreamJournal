angular.module('dreamjournal.services', [])

.factory('djMainFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
// ($rootScope.signedIn) <-----------------------Could help me check if user is signed in, and only do a createuser call once
	//refer to routes on legacy, they have this at the bottom. Really could fix my bug


  var userName = auth.profile.name;
  var userEmail = auth.profile.email;  
	var allPostsData = [];
  var userPostsData = [];
  var userData = [];

//===================================================================Create New User===============================================================
  var createUser = function(){    
  	$http({
        method: 'POST',
        url: '/create/new/user',
        data: {name: userName, email: userEmail}
      })
      .then(function(resp){
        userData.unshift(resp);
      }, function(err){
        console.log('error', err);
      });
	};

//=====================================================================Get Blog Posts=============================================================
	var getPosts = function(email){
    $http({
  		method: 'GET',
  		url: '/post/' + email,
  	})
   .then(function(result) {
      if(email){
        result.data.forEach(function(post) {
          userPostsData.unshift(post);
        }); 
      userPostsData = [];
      } else{
        result.data.forEach(function(post) {
          allPostsData.unshift(post);
        });
        allPostsData = [];    
      }
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

//==================================================================Allow user to view a single post========================================================================

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

	return {
		allPostsData: allPostsData,
    userPostsData: userPostsData,
		userData: userData,
		userEmail: userEmail,
		userName: userName,
		createUser: createUser,
		getPosts: getPosts,
		commentOnPost: commentOnPost,
		deleteComment: deleteComment,
		likePost: likePost,
		viewSinglePost: viewSinglePost,
		singlePost: singlePost
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

