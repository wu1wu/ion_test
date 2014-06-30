var app = angular.module('myApp.controllers', []);

app.controller('DashCtrl', ['$scope', function($scope) {
}]);

app.controller('TaksCtrl', ['$scope', 'TaskFactory', '$ionicPopup', function($scope, Task, $ionicPopup) {
  $scope.tasks = Task.all();

  $scope.reorderTask = function(task, fromIndex, toIndex) {
    $scope.tasks.splice(fromIndex, 1);
    $scope.tasks.splice(toIndex, 0, task);
  };


  // $scope.deleteTask = function(task) {
  //   $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  // };
  

   $scope.deleteTask = function(task) {
     var _task = task;

     var confirmPopup = $ionicPopup.confirm({
       title: "something",
       template: 'Are you sure you want to delete this task?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.tasks.splice($scope.tasks.indexOf(_task), 1);
       } 
     });

     return false;
   };



}]);

app.controller('TaskDetailCtrl', ['$scope', '$stateParams', 'TaskFactory', function($scope, $stateParams, Task) {
  $scope.task = Task.get($stateParams.taskId);


}]);

app.controller('AccountCtrl', ['$scope', function($scope) {
}]);
