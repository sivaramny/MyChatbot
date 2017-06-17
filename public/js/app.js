var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home.html'
  }).
  when('/cr', {
    templateUrl: 'partials/cr.html'
  }).
  when('/webex', {
    templateUrl: 'partials/webex.html'
  }).
  when('/lms', {
    templateUrl: 'partials/lms.html'
  }).
  when('/bridge', {
    templateUrl: 'partials/bridge.html'
  }).
  when('/lp', {
    templateUrl: 'partials/lp.html'
  }).
  when('/sr', {
    templateUrl: 'partials/sr.html'
  }).
  when('/chatbot', {
    templateUrl: 'partials/chatBot.html'
  }).
  otherwise({
    redirectTo: '/home',
  });
});

myApp.controller("headerController", function($scope,  $location) {
    $scope.menus = {};
    $scope.menus.activeMenu = 'home';
    $scope.menuItems = [
        {title: 'Home', url:'/home'},
        {title: 'Conference Room', url:'/cr'},
        {title: 'Webex', url:'/webex'},
        {title: 'Bridge', url:'/bridge'},
        {title: 'Learning Portal', url:'/lp'},
        {title: 'LMS', url:'/lms'},
        {title: 'Software Request', url:'/sr'}
    ];

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});


myApp.controller('myCtrl', function($scope, $window, $location) {
  $scope.redirect = function() {
    $location.path('chatbot');
  };

  $scope.close = function() {
    $location.path('home');
  };


});

myApp.factory("DataModel", function() {
  var Service = {};

  return Service;
});

myApp.controller("ChatController", function($scope,$http) {
  $scope.chatMessages = [];

  $scope.formatChat = function(username,text,origDt) {
    var chat = {};
    chat.username = username;
    chat.text = text;
    chat.origDt = origDt;
    return chat;
  }

  $scope.addChat = function() {
    // if ($scope.newChatMsg != "") {
    //   var chat = $scope.formatChat("VZ",
    //                        $scope.newChatMsg,
    //                        new Date());
    //
    //   $scope.chatMessages.push(chat);
    //   $scope.newChatMsg = "";
    // }
    $http({method: 'POST',
      url: "/test",
      data: {msg:$scope.newChatMsg},
      headers: {'Content-Type':'application/json'}
    }).
    success(function(data) {
        //console.log("data..."+data);
        console.log("posted successfully");
    }).error(function(data) {
        console.error("error in posting");
    })
  }

});

myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
