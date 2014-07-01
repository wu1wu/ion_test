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


app.controller('AccountCtrl', ['$scope', '$cordovaBarcodeScanner', function($scope, $cordovaBarcodeScanner) {

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      // Success! Barcode data is here
      console.log('Scan successfull');
      console.log('imageData >>', imageData);
  

    }, function(err) {
      // An error occured. Show a message to the user
      console.log('Scan unsuccessfull');
      console.log('err >>', err);

    });
  };

  // // NOTE: encoding not functioning yet
  // $scope.encodeData = function() {
  //   $cordovaBarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com").then(function(success) {
  //     // Success! 
  //   }, function(err) {
  //     // An error occured. Show a message to the user

  //   });      
  // }

}]);

