var app = angular.module('myApp', ['ionic', 'ngCordova', 'myApp.controllers', 'myApp.services'])


app.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(true);
}]);



app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })


    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/tab-tasks.html',
          controller: 'TasksCtrl'
        }
      }
    })

    .state('tab.task-detail', {
      url: '/task/:taskId',
      views: {
        // re-use the same tab
        'tab-tasks': {
          templateUrl: 'templates/task-detail.html',
          controller: 'TaskDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('camera', {
      url: '/camera',
      templateUrl: 'templates/camera.html',
      controller: 'CameraCtrl'
    })

    .state('contacts', {
      url: '/contacts',
      templateUrl: 'templates/contacts.html',
      controller: 'ContactsCtrl'
    })

    .state('location', {
      url: '/location',
      templateUrl: 'templates/location.html',
      controller: 'LocationCtrl'
    })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/tasks');

}]);

