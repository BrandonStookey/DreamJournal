angular.module('dreamjournal.services', ['textAngular'])

.factory('djMainFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
// ($rootScope.signedIn) <-----------------------Could help me check if user is signed in, and only do a createuser call once
	//refer to routes on legacy, they have this at the bottom. Really could fix my bug


  var userName = undefined || auth.profile.name;
  var userEmail = undefined || auth.profile.email;  
	var allPostsData = [];
  var userPostsData = [];
  var singlePost = [];
  var userData = [];
  var getUserLikeData = [];

//===================================================================Create New User===============================================================
  var createUser = function(){    
  	$http({
        method: 'POST',
        url: '/user',
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
      if(userPostsData.length < 1 && result.data[0] !== undefined){
        userPostsData.unshift(result.data[0]);
      };
      // console.log('userPostsData before loop: ', userPostsData[0]._id);
      for(var i = 0; i < result.data.length; i++){
            console.log('result.data[i]._id: ', result.data[i]._id);
          for(var j = 0; j < result.data.length; j++){
            console.log('j ', j);
            if(userPostsData[j] === undefined){
              userPostsData.unshift(result.data[i]);
              break;
            }
            if(result.data[i]._id == userPostsData[j]._id) {
              console.log('userPostsData inside loop: ', userPostsData[j]._id);
              userPostsData[j] = result.data[i];
              break;
            } 
          } 
        }
    }, function(err) {
      console.error('Post GET error:', err);
    });
  }



//=====================================================================Get All Blog Posts=============================================================
	var createPost = function(postTitle, post, dreamNightmare){
   $http({
      method: 'POST',
      url: '/post',
      data: {postTitle: postTitle, post: post, name: userName, email: userEmail, dreamType: dreamNightmare}
    })
    .then(function(resp){
      $location.path('/profile');      
      console.log(resp);
    }, function(error){
      console.log(error);
    });
  };

  var getAllPosts = function(postTitle, post, dreamNightmare){
    $http({
      method: 'GET',
      url: '/post',
    })
    .then(function(result) {
      if(allPostsData.length < 1 && result.data[0] !== undefined){
        allPostsData.unshift(result.data[0]);
      };
      for(var i = 0; i < result.data.length; i++){
          for(var j = 0; j < result.data.length; j++){
            if(allPostsData[j] === undefined){
              allPostsData.unshift(result.data[i]);
              break;
            }
            if(result.data[i]._id == allPostsData[j]._id) {
              allPostsData[j] = result.data[i];
              break;
            } 
          } 
        }
    }, function(err) {
        console.error('Post GET error:', err);
    });
  }; 

//============================================Edit/Update Post

  var updatePost = function(postTitle, post, dreamNightmare, postID){
    $http({
      method: 'PUT',
      url: '/post/' + postID,
      data: {email: userEmail, postTitle: postTitle, post: post, dreamType: dreamNightmare}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });    
  };


//============================================Delete Single Post

  var deletePost = function(postID){
    $http({
      method: 'DELETE',
      url: '/post/' + postID,
      data: {postID: postID}
    })
    .then(function(resp){  
      // getAllPosts();
      getAllUserPosts(auth.profile.email);  
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
  };

//==============================================View Single Post

  var viewSinglePost = function(postID){
    $http({
      method: 'GET',
      url: '/post/' + postID,
    })
   .then(function(result) {
        singlePost[0] = result;
        $location.path('/viewPost');
    }, function(err) {
      console.error('Post GET error:', err);
    });

  };

  //==================================================================Create Comment============================================================================

  var commentOnPost = function(comment, postID){
     $http({
      method: 'POST',
      url: '/comment',
      data: {postID: postID, name: userName, comment: comment}
    })
    .then(function(resp){
      console.log('comment resp', resp);
      getAllPosts();
      getAllUserPosts(auth.profile.email);
      if(singlePost[0].data._id === postID){
        viewSinglePost(postID);
      }
    }, function(err){
      console.log('error', err);
    }); 
  };
//================================================Delete Comment
	var deleteComment = function(postID, commentID){
      console.log('controllers: ', commentID);
     $http({
      method: 'PUT',
      url: '/comment',
      data: {postID: postID, commentID: commentID}
    })
    .then(function(resp){    
      getAllPosts();
      getAllUserPosts(auth.profile.email);
      if(singlePost[0].data._id === postID){
        viewSinglePost(postID);
      }
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
	      url: '/like',
	      data: {postID: postID, userEmail: userEmail, name: userName, like: userLikePost}
	    })
	    .then(function(resp){
      getAllPosts();
      getAllUserPosts(auth.profile.email);
      if(singlePost[0].data._id === postID){
        viewSinglePost(postID);
      }
	    }, function(err){
	      console.log('error', err);
	    });     
	  } else{
	//=========================if userLikePost is false then it will remove the 'like' from the database    
	   $http({
	      method: 'PUT',
	      url: '/like',
	      data: {postID: postID, userEmail: userEmail, like: userLikePost}
	    })
	    .then(function(resp){
      getAllPosts();   
      getAllUserPosts(auth.profile.email);
      if(singlePost[0].data._id === postID){
        viewSinglePost(postID);
      }

	    }, function(err){
	      console.log('error', err);
	    });   
	  }
	};

  // var getUserLike = function(postID){
  //   $http({
  //     method: 'GET',
  //     url: '/like/' + postID + '/' + userEmail,
  //   })
  //   .then(function(resp){
  //   getUserLikeData[0] = resp.data;  
  //   getAllPosts();   
  //   getAllUserPosts(auth.profile.email);
  //   // viewSinglePost(postID);
  //   }, function(err){
  //     console.log('error', err);
  //   }); 
  // };

	return {
		allPostsData: allPostsData,
    userPostsData: userPostsData,
    singlePost: singlePost,
		userData: userData,
		userEmail: userEmail,
		userName: userName,
		createUser: createUser,
    getAllUserPosts: getAllUserPosts,
    createPost: createPost,
		getAllPosts: getAllPosts,
    viewSinglePost: viewSinglePost,
		commentOnPost: commentOnPost,
		deleteComment: deleteComment,
		likePost: likePost,
    updatePost: updatePost,
    deletePost: deletePost,
    // getUserLike: getUserLike,
    // getUserLikeData: getUserLikeData
	}

}])
  //==========================This Allows me to Edit the Toolbar, and below is the website with instructions=======================================

.config(['$provide', function($provide){
  // https://github.com/fraywing/textAngular/wiki/Setting-Defaults
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['$delegate', function(taOptions){
            // $delegate is the taOptions we are decorating
            // here we override the default toolbars and classes specified in taOptions.
            taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
            taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'quote'],
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
                ['insertImage', 'insertLink', 'wordcount']
                //Later if I want to insertImage just place 'insertImage' insertLink
            ];
            taOptions.classes = {
                focussed: 'focussed',
                toolbar: 'btn-toolbar',
                toolbarGroup: 'btn-group',
                toolbarButton: 'btn btn-default',
                toolbarButtonActive: 'active',
                disabled: 'disabled',
                textEditor: 'form-control',
                htmlEditor: 'form-control'
            };
            return taOptions; // whatever you return will be the taOptions
        }]);
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

