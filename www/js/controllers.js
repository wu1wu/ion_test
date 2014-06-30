var app = angular.module('myApp.controllers', []);

app.controller('DashCtrl', ['$scope', function($scope) {
}]);

app.controller('TaksCtrl', ['$scope', 'TaskFactory', function($scope, Task) {
  $scope.tasks = Task.all();

  $scope.reorderTask = function(task, fromIndex, toIndex) {
    $scope.tasks.splice(fromIndex, 1);
    $scope.tasks.splice(toIndex, 0, task);
  };


  $scope.deleteTask = function(task) {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  };
  


}]);

app.controller('TaskDetailCtrl', ['$scope', '$stateParams', 'TaskFactory', function($scope, $stateParams, Task) {
  $scope.task = Task.get($stateParams.taskId);


}]);

app.controller('AccountCtrl', ['$scope', function($scope) {
}]);
