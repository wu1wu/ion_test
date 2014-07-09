var app = angular.module('myApp.controllers', []);

app.controller('DashCtrl', ['$scope', function($scope) {
}]);

app.controller('TasksCtrl', ['$scope', 'TaskFactory', '$ionicPopup', '$ionicActionSheet', '$timeout', function($scope, Task, $ionicPopup, $ionicActionSheet, $timeout) {
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

  $scope.scaned = {};
  $scope.blob = null;

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.scaned = {
        'format': imageData.format,
        'text': imageData.text
      };
      $scope.blob = imageData;

    }, function(err) {
      $scope.scaned = {};
      $scope.blob = err;
    });
  };


}]);


app.controller('CameraCtrl', ['$scope', '$cordovaCamera', function($scope, $cordovaCamera) {

  $scope.imageSrc = null;
  $scope.cameraError = null;

  $scope.takePicture = function() {
    var options = {
      quality : 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : false,  // discard or save option on Android
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      cameraDirection: Camera.Direction.FRONT
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imageSrc = "data:image/png;base64," + imageData;
      $scope.cameraError = null;
    }, function(err) {
      $scope.cameraError = err;
    });
  }
}]);


app.controller('ContactsCtrl', ['$scope', '$cordovaContacts', function($scope, $cordovaContacts) {
  
  $scope.contacts = null;
  $scope.contactError = null;

  var options = {
    fields: ["id", "displayName", "name", "phoneNumbers", "emails", "birthday", "photos"],
    multiple: true
  };

  $cordovaContacts.find(options).then(function(contacts){    
    $scope.contacts = contacts;
    $scope.contactError = null;
  }, function(err){
    $scope.contacts = null;
    $scope.contactError = err;
  });


  // function onSuccess(contacts) {
  //   $scope.contacts = contacts;


  //   // for (var i=0; i<contacts.length; i++) {
  //   //     // display phone numbers
  //   //     alert(contacts[i].displayName);

  //   //     alert("Formatted: " + contacts[i].name.formatted + "\n" + 
  //   //           "Family Name: "  + contacts[i].name.familyName + "\n" + 
  //   //           "Given Name: "  + contacts[i].name.givenName + "\n" + 
  //   //           "Middle Name: "  + contacts[i].name.middleName + "\n" + 
  //   //           "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
  //   //           "Prefix: "  + contacts[i].name.honorificPrefix);

  //   //     for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
  //   //         alert("Type: " + contacts[i].phoneNumbers[j].type + "\n" + 
  //   //               "Value: "  + contacts[i].phoneNumbers[j].value + "\n" + 
  //   //               "Preferred: "  + contacts[i].phoneNumbers[j].pref);
  //   //     }
  //   // }

  //   $scope.contactError = null;
  //   console.log("contacts >>>", contacts);
  // };

  // function onError(contactError) {
  //   $scope.contacts = null;
  //   $scope.contactError = err;
  //   console.log("contactError >>>", contactError);
  // };

  // var options      = new ContactFindOptions();
  // options.filter   = "Sergio";
  // options.multiple = true;
  // // options.desiredFields = ["id", "displayName", "name", "phoneNumbers", "emails", "birthday", "photos"];
  // var fields       = ["id", "displayName", "name", "phoneNumbers", "emails", "birthday", "photos"];

  // navigator.contacts.find(fields, onSuccess, onError, options);
  

}]);


app.controller('LocationCtrl', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {

  $scope.currentLocation = null;
  $scope.locationError = null;
  $scope.timestamp = null;

  var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

  // $cordovaGeolocation.getCurrentPosition().then(function(position) {
  //   // Position here: position.coords.latitude, position.coords.longitude
  //   $scope.currentLocation = position;
  //   $scope.locationError = null;
  //   $scope.timestamp = position.timestamp;
  // }, function(err) {
  //   $scope.currentLocation = null;
  //   $scope.locationError = err;
  // });

  $cordovaGeolocation.watchPosition(options).then(function() {
      // Not currently used
    }, function(err) {
      $scope.currentLocation = null;
      $scope.locationError = err;
    }, function(position) {
      $scope.currentLocation = position;
      $scope.locationError = null;
      $scope.timestamp = position.timestamp;
  });

}]);



