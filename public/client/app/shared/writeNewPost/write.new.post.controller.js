'use strict';

angular.module('dreamjournal.newPost', ['textAngular'])

.controller('newPostController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {
  $scope.createPost = function(postTitle, post){
	  var userName = auth.profile.name;
    var userEmail = auth.profile.email;

    return $http({
      method: 'POST',
      url: '/create/post',
      data: {postTitle: postTitle, post: post, name: userName, email: userEmail}
    })
    .then(function(resp){
      console.log(resp);
    }, function(error){
      console.log(error);
    });
  };
  
}])
.config(['$provide', function($provide){
  //=============================================This Allows me to Edit the Toolbar, and below is the website with instructions
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
    }]);