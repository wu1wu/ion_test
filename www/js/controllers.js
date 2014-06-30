angular.module('myApp.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('TaksCtrl', ['$scope', 'TaskFactory', function($scope, Task) {
  $scope.tasks = Task.all();
}])

.controller('TaskDetailCtrl', ['$scope', '$stateParams', 'TaskFactory', function($scope, $stateParams, Task) {
  console.log("SDfsdfsd");
  $scope.task = Task.get($stateParams.taskId);
}])

.controller('AccountCtrl', function($scope) {
});
