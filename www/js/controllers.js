var app = angular.module('myApp.controllers', []);

app.controller('DashCtrl', ['$scope', function($scope) {
}]);

app.controller('TaksCtrl', ['$scope', 'TaskFactory', '$ionicPopup', '$ionicActionSheet', '$timeout', function($scope, Task, $ionicPopup, $ionicActionSheet, $timeout) {
  $scope.tasks = Task.all();



  $scope.reorderTask = function(task, fromIndex, toIndex) {
    $scope.tasks.splice(fromIndex, 1);
    $scope.tasks.splice(toIndex, 0, task);
  };



  $scope.deleteTask = function(task, $event) {
    // $event.preventDefault();
    $event.stopPropagation();

    var _task = task;

    var confirmPopup = $ionicPopup.confirm({
      title: _task.name,
      template: 'Are you sure you want to delete this task?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.tasks.splice($scope.tasks.indexOf(_task), 1);
      } 
    });

    return false;
  };


  $scope.openActionSheet = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Some more actions for your task list',
     cancelText: 'Cancel',
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 5000);

 };



}]);

app.controller('TaskDetailCtrl', ['$scope', '$stateParams', 'TaskFactory', function($scope, $stateParams, Task) {
  $scope.task = Task.get($stateParams.taskId);
}]);

app.controller('AccountCtrl', ['$scope', function($scope) {
}]);
