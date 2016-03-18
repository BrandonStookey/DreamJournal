describe('Routing', function () {
  var $route;
  beforeEach(module('dreamjournal'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.ok();
    expect($route.routes['/login'].controller).to.be('loginController');
    expect($route.routes['/login'].templateUrl).to.be('app/shared/login/login.view.html');
  });

  // it('Should have /graph route, template, and controller', function () {
  //   expect($route.routes['/graph']).to.be.ok();
  //   expect($route.routes['/graph'].controller).to.be('graphController');
  //   expect($route.routes['/graph'].templateUrl).to.be('app/shared/graph/graph.view.html');
  // });

  // it('Should have /profile route, template, and controller', function () {
  //   expect($route.routes['/profile']).to.be.ok();
  //   expect($route.routes['/profile'].controller).to.be('profileController');
  //   expect($route.routes['/profile'].templateUrl).to.be('app/shared/profile/profile.view.html');
  // });

  // it('Should have /viewPost route, template, and controller', function () {
  //   expect($route.routes['/viewPost']).to.be.ok();
  //   expect($route.routes['/viewPost'].controller).to.be('viewPostController');
  //   expect($route.routes['/viewPost'].templateUrl).to.be('app/shared/viewSinglePost/view.post.view.html');
  // });

  // it('Should have /newPost route, template, and controller', function () {
  //   expect($route.routes['/newPost']).to.be.ok();
  //   expect($route.routes['/newPost'].controller).to.be('newPostController');
  //   expect($route.routes['/newPost'].templateUrl).to.be('app/shared/writeNewPost/write.new.post.view.html');
  // });

  // it('Should have /home route, template, and controller', function () {
  //   expect($route.routes['/home']).to.be.ok();
  //   expect($route.routes['/home'].controller).to.be('homeController');
  //   expect($route.routes['/home'].templateUrl).to.be('app/shared/home/home.view.html');
  // });
});














